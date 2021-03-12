import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveText } from "./actions";

export default function Textgenerator() {
    const dispatch = useDispatch();
    // const [restart, setRestart] = useState(false);
    const generatedText = useSelector((state) => state && state.generatedText);
    console.log("text in tg");

    useEffect(() => {
        dispatch(receiveText());
    }, []);

    return (
        <>
            {" "}
            <h3>My Textgenerator</h3>
            <button
                onClick={() => {
                    console.log("restart");
                    dispatch(receiveText());
                }}
            >
                Restart
            </button>
            <div>
                {generatedText &&
                    generatedText.map((singleLetter, index) => (
                        <span className={singleLetter.typingStatus} key={index}>
                            {singleLetter.letter}
                        </span>
                    ))}
            </div>
        </>
    );
}
