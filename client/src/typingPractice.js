import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStatusColor } from "./actions";

export default function TypingPractice() {
    const dispatch = useDispatch();
    const generatedText = useSelector((state) => state && state.generatedText);
    console.log("generatedText in tp", generatedText);

    //   useEffect(() => dispatch(updateStatusColor("i", "correct-typing")));

    const handleKeyDown = (event) => {
        console.log("typing");
        const index = event.target.value.length;
        if (event.key === generatedText[index].letter) {
            //console.log("ja", event.key, generatedText[index].letter);
            dispatch(updateStatusColor(index, "correct-typing"));
        } else {
            console.log("no");
            dispatch(updateStatusColor(index, "incorrect-typing"));
        }
    };

    return (
        <>
            <h3>typing - pactice:</h3>
            <input onKeyDown={handleKeyDown}></input>
        </>
    );
}
