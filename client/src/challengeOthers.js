import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "./socket";

export const BUTTON_TEXT = {
    MAKE_CHALLENGE: "Challenge",
    CANCEL_CHALLENGE: "Cancel Challenge",
    ACCEPT_CHALLENGE: "Accept Challenge",
};

export default function ChallengeOthers() {
    const [currentPlayerId, setCurrentPlayerId] = useState();
    const noPendingChallenge = useSelector(
        (state) =>
            state.onliners &&
            state.onliners.filter((status) => status.accepted === undefined)
    );
    console.log("noPendingChallenge", noPendingChallenge);

    const challengedPlayers = useSelector(
        (state) =>
            state.onliners &&
            state.onliners.filter(
                (status) =>
                    status.accepted === false &&
                    status.sender_id === currentPlayerId
            )
    );

    const challengingPlayers = useSelector(
        (state) =>
            state.onliners &&
            state.onliners.filter((status) => status.accepted === true)
    );

    useEffect(() => {
        socket.on("current player", (data) => {
            setCurrentPlayerId(data.currentPlayer);
        });
    }, [currentPlayerId]);

    const clickButton = (otherPlayerId, event) => {
        socket.emit("button click", {
            otherPlayerId: otherPlayerId,
            buttonText: event.target.innerText,
        });
    };

    const noChallenge = (
        <div className="online-players">
            {noPendingChallenge &&
                noPendingChallenge.map((player) => (
                    <div className="online-player" key={player.id}>
                        {currentPlayerId != player.id && (
                            <>
                                <p>
                                    {player.username}
                                    <button
                                        onClick={(event) =>
                                            clickButton(player.id, event)
                                        }
                                    >
                                        {BUTTON_TEXT.MAKE_CHALLENGE}
                                    </button>
                                </p>
                            </>
                        )}
                    </div>
                ))}
        </div>
    );
    const challengers = (
        <div className="online-players">
            {challengingPlayers &&
                challengingPlayers.map((player) => (
                    <div className="online-player" key={player.id}>
                        {currentPlayerId != player.id && (
                            <>
                                <p>
                                    {player.username}
                                    <button
                                        onClick={(event) =>
                                            clickButton(player.id, event)
                                        }
                                    >
                                        {BUTTON_TEXT.ACCEPT_CHALLENGE}
                                    </button>
                                </p>
                            </>
                        )}
                    </div>
                ))}
        </div>
    );
    const challenged = (
        <div className="online-players">
            {challengedPlayers &&
                challengedPlayers.map((player) => (
                    <div className="online-player" key={player.id}>
                        {currentPlayerId != player.id && (
                            <>
                                <p>
                                    {player.username}
                                    <button
                                        onClick={(event) =>
                                            clickButton(player.id, event)
                                        }
                                    >
                                        {BUTTON_TEXT.CANCEL_CHALLENGE}
                                    </button>
                                </p>
                            </>
                        )}
                    </div>
                ))}
        </div>
    );

    return (
        <div className="onliners-container">
            <h1>Challenge Others</h1>
            {noChallenge}
            {challengers}
            {challenged}
        </div>
    );
}
