import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStatusColor, updateProgress, setTimer } from "./actions";
import ProgressBar from "./ProgressBar";
import Timer from "./timer";

export default function TypingPractice() {
    const dispatch = useDispatch();
    const generatedText = useSelector((state) => state && state.generatedText);
    const progressValue = useSelector((state) => state && state.progressValue);
    const timer = useSelector((state) => state && state.timer);
    //console.log("progressValue", progressValue);

    useEffect(() => {}, [progressValue]);

    const handleKeyDown = (event) => {
        const index = event.target.value.length;
        dispatch(updateProgress(index));

        if (event.key === generatedText[index].letter) {
            dispatch(updateStatusColor(index, "correct-typing"));
        } else {
            dispatch(updateStatusColor(index, "incorrect-typing"));
        }
        if (index === generatedText.length-1) {
            dispatch(setTimer(false));
            console.log("timer stop");
        } else {
            dispatch(setTimer(true));
            console.log("timer is running", index, generatedText.length);
        }
    };

    // const setTimer = (event) => {
    //     console.log(
    //         "setTimer",
    //         event.target.value.length,
    //         generatedText.length
    //     );
    //
    // };

    return (
        <>
            <h3>typing - pactice:</h3>
            {timer && <Timer timerOn={timer} />}
            {!timer && <Timer timerOn={timer} />}
            {progressValue && (
                <>
                    <ProgressBar
                        value={progressValue.value}
                        maxValue={progressValue.maxValue}
                        minValue={progressValue.minValue}
                    />
                </>
            )}
            <input onKeyDown={handleKeyDown}></input>
        </>
    );
}
