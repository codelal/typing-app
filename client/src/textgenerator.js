import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveText } from "./actions";

export default function Textgenerator() {
    const dispatch = useDispatch();
    // const [restart, setRestart] = useState(false);
    const generatedText = useSelector((state) => state && state.generatedText);
    //console.log("text in tg", generatedText);

    useEffect(() => {
        dispatch(receiveText("j"));
       
        // setStatus("incorrectTyping");
    }, []);

    return (
        <>
            {" "}
            <h3>My Textgenerator</h3>
            <div>
                {generatedText &&
                    generatedText.map((singleLetter, index) => (
                        <span className={singleLetter.statusColor} key={index}>
                            {singleLetter.letter}
                        </span>
                    ))}
            </div>
            <button
                onClick={() => {
                    console.log("restart");
                }}
            >
                Restart
            </button>
        </>
    );
}
