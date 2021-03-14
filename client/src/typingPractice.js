import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    updateStatusColor,
    updateProgress,
    timerStatus,
    receiveText,
} from "./actions";
import ProgressBar from "./progressBar";
import Timer from "./timer";

export default function TypingPractice() {
    const dispatch = useDispatch();
    const generatedText = useSelector((state) => state && state.generatedText);
    const progressValue = useSelector((state) => state && state.progressValue);
    //console.log("progressValue", progressValue);

    useEffect(() => {}, [progressValue]);

    const handleKeyDown = (event) => {
        const index = event.target.value.length;
        dispatch(updateProgress(index));

        if (index === generatedText.length - 1) {
            document.getElementById("input").readOnly = true;
            dispatch(timerStatus("stop"));
        } else {
            dispatch(timerStatus("runs"));
            //console.log("timer is running", index, generatedText.length);
        }

        if (event.key === generatedText[index].letter) {
            dispatch(updateStatusColor(index, "correct-typing"));
            //console.log("index in key", index);
        } else {
            dispatch(updateStatusColor(index, "incorrect-typing"));
        }
    };

    const restart = () => {
        console.log("restart");
        dispatch(receiveText());
        document.getElementById("input").value = "";
        dispatch(timerStatus("clear"));
    };

    return (
        <>
            <h3>typing - practice:</h3>
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
        </>
    );
}
