import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveText } from "./actions";

export default function Textgenerator() {
    const dispatch = useDispatch();
    const generatedText = useSelector((state) => state && state.generatedText);

    useEffect(() => {
        dispatch(receiveText());
    }, []);

    return (
        <>
            {" "}
            <div>
                {generatedText &&
                    generatedText.map((singleLetter, index) => (
                        <span className={singleLetter.typingStatus} key={index}>
                            {singleLetter.letter}
                        </span>
                    ))}
                <br />
            </div>
        </>
    );
}
