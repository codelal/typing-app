import { useEffect, useState } from "react";
import { socket } from "./socket";
import { BUTTON_TEXT } from "./buttonText";
import { Link } from "react-router-dom";

export default function ChallengeAlert() {
    const [getChallenge, setGetChallenge] = useState(false);
    const [challengeAccepted, setChallengeAccepted] = useState(false);
    const [otherUserId, setOtherUserId] = useState();

    useEffect(() => {
        socket.on("get challenge", (otherUserId) => {
            console.log("get challenge in challengeAlert", otherUserId);
            setGetChallenge(true);
            setOtherUserId(otherUserId);
        });
    }, [getChallenge]);

    socket.on("challenge accepted", (data) => {
        console.log("challenge accepted in socket.js", data);
        setChallengeAccepted(true);
    });

    const buttonClick = (event) => {
        console.log("click accept challenge");
        socket.emit("button click", {
            otherUserId: otherUserId,
            buttonText: event.target.innerText,
        });
    };

    const playLater = () => {
        // Write here Code to change ButtonText
        setGetChallenge(false);
    };

    return (
        <>
            {getChallenge && (
                <div className="challenge-alert">
                    <p
                        className="close-x"
                        onClick={() => setGetChallenge(false)}
                    >‚
                        X
                    </p>
                    <p>Wants to play with you</p>
                    <p
                        className="answer"
                        onClick={(event) => buttonClick(event)}
                    >
                        {BUTTON_TEXT.ACCEPT_CHALLENGE}
                    </p>
                    <p
                        className="answer"
                        onClick={(event) => buttonClick(event)}
                    >
                        {BUTTON_TEXT.REJECT_CHALLENGE}
                    </p>
                    <p className="answer" onClick={() => playLater()}>
                        maybe later
                    </p>
                </div>
            )}
            {challengeAccepted && (
                <div className="challenge-alert">
                    <p>xxx accpepted you challenge</p>
                    <Link to="/play-duel-secret-link">
                        Click here to play with NAME
                    </Link>
                </div>
            )}
        </>
    );
}
