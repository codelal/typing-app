import { useState } from "react";
import { useDispatch } from "react-redux";
import { submitUserName } from "./actions";

export default function Register() {
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const [input, setInput] = useState("");

    const handleInput = (event) => {
        setError("");
        setInput(event.target.value);
    };

    const submitInput = () => {
        if (input.length > 0) {
            dispatch(submitUserName(input));
        } else {
            setError("You need a username to play");
        }
    };

    return (
        <div className="register">
            <h3>Register</h3>
            {error && <p className="error">{error}</p>}
            {<p>Please enter you name</p>}
            <input className="input-register" onChange={handleInput}></input>
            <button className="btn-register" onClick={submitInput}>
                Submit
            </button>
        </div>
    );
}
