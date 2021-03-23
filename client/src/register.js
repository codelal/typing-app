import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitUserName, hideRegister } from "./actions";

export default function Register() {
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const [input, setInput] = useState("");

    const handleInput = (event) => {
        setError("");
        setInput(event.target.value);
    };

    const submitInput = () => {
        if (input.length > 1) {
            dispatch(submitUserName(input));
            dispatch(hideRegister(true));
        } else {
            setError("You need a username to play");
        }
    };

    return (
        <div className="register">
            {error && <p>{error}</p>}
            {<p>Please enter you name</p>}
            <input onChange={handleInput}></input>
            <button onClick={submitInput}>Submit</button>
        </div>
    );
}
