import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStatusColor, updateProgress } from "./actions";
import ProgressBar from "./ProgressBar";

export default function TypingPractice() {
    const dispatch = useDispatch();
    const generatedText = useSelector((state) => state && state.generatedText);
    const progressValue = useSelector((state) => state && state.progressValue);
    // const value = useSelector((state) => state && state.value);
    // const maxValue = useSelector((state) => state && state.maxValue);
    // const minValue = useSelector((state) => state && state.minValue);
    //console.log("generatedText in tp", generatedText);
    //console.log("progressValue", maxValue, minValue, value);

    console.log("progressValue", progressValue);
    useEffect(() => {}, [progressValue]);

    const handleKeyDown = (event) => {
        // console.log("typing");
        const index = event.target.value.length;
        if (event.key === generatedText[index].letter) {
            //console.log("ja", event.key, generatedText[index].letter);
            dispatch(updateStatusColor(index, "correct-typing"));
            dispatch(updateProgress(index));
        } else {
            console.log("no");
            dispatch(updateStatusColor(index, "incorrect-typing"));
        }
    };

    return (
        <>
            <h3>typing - pactice:</h3>
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
