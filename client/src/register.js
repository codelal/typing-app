import { useState } from "react";
import { useDispatch } from "react-redux";
import { submitUserName } from "./actions";
import { socket } from "./socket";

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
            location.replace("/challenge-others");

            socket.emit("challenge player", 2222);
            socket.emit("username", input);
        } else {
            setError("You need a username to play");
        }
    };

    return (
        <div className="register">
            <h3>register</h3>
            {error && <p>{error}</p>}
            {<p>Please enter you name</p>}
            <input onChange={handleInput}></input>
            <button onClick={submitInput}>Submit</button>
        </div>
    );
}
