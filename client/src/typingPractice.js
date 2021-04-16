import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Textgenerator from "./Textgenerator";
import {
    updateStatusColor,
    updateProgress,
    timerStatus,
    receiveText,
    correctTyping,
} from "./actions";
import ProgressBar from "./ProgressBar";
import Timer from "./Timer";

export default function TypingPractice() {
    const dispatch = useDispatch();
    const generatedText = useSelector((state) => state && state.generatedText);
    const progressValue = useSelector((state) => state && state.progressValue);

    useEffect(() => {}, [progressValue]);

    const handleKeyDown = (event) => {
        const index = event.target.value.length;
        dispatch(updateProgress(index));

        if (index === generatedText.length - 1) {
            document.getElementById("input").readOnly = true;
            dispatch(timerStatus("stop"));
        } else {
            dispatch(timerStatus("runs"));
        }

        if (event.key === generatedText[index].letter) {
            dispatch(updateStatusColor(index, "correct-typing"));
            dispatch(correctTyping());
        } else {
            dispatch(updateStatusColor(index, "incorrect-typing"));
        }
    };

    const restart = () => {
        dispatch(receiveText());
        document.getElementById("input").value = "";
        dispatch(timerStatus("clear"));
    };

    return (
        <>
            <Textgenerator />
            {<Timer />}
            {progressValue && (
                <>
                    <ProgressBar
                        value={progressValue.value}
                        maxValue={progressValue.maxValue}
                        minValue={progressValue.minValue}
                    />
                </>
            )}
            <input id="input" onKeyDown={handleKeyDown}></input>
            <br />
            <button onClick={restart}>Restart</button>
            <br />
            <button>
                {" "}
                <Link to="/register">Play with Others</Link>
            </button>
        </>
    );
}
