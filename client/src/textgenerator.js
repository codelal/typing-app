import { useEffect, useState } from "react";
import axios from "./axios";

export default function Textgenerator() {
    const [text, setText] = useState("");
    useEffect(() => {
        axios
            .get("https://hipsum.co/api/?type=hipster-centric&sentences=3")
            .then(({ data }) => {
                console.log(data[0]);
                setText(data[0]);
            });
    }, []);
    return (
        <>
            {" "}
            <h3>My Textgenerator</h3>
            {text && <p>{text}</p>}
        </>
    );
}
