import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStatusColor, updateProgress, timerIsRunning } from "./actions";
import ProgressBar from "./ProgressBar";
import Timer from "./timer";

export default function TypingPractice() {
    const dispatch = useDispatch();
    const generatedText = useSelector((state) => state && state.generatedText);
    const progressValue = useSelector((state) => state && state.progressValue);
    const timer = useSelector((state) => state && state.timer);
    //console.log("progressValue", progressValue);

    useEffect(() => {}, [progressValue, timer]);

    const handleKeyDown = (event) => {
        const index = event.target.value.length;
        dispatch(updateProgress(index));

        if (index === generatedText.length - 1) {
            document.getElementById("input").readOnly = true;
            dispatch(timerIsRunning(false));
        } else {
            dispatch(timerIsRunning(true));
            //console.log("timer is running", index, generatedText.length);
        }

        if (event.key === generatedText[index].letter) {
            dispatch(updateStatusColor(index, "correct-typing"));
            //console.log("index in key", index);
        } else {
            dispatch(updateStatusColor(index, "incorrect-typing"));
        }
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
        </>
    );
}
