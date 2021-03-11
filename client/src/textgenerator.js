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
            <h3>My Textgenerator</h3>
            {generatedText && <p>{generatedText}</p>}
        </>
    );
}
