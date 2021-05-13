import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "./socket";
import { BUTTON_TEXT } from "./buttonText";
import ChallengeAlert from "./ChallengeAlert";

export default function Onliners() {
    const [currentPlayerId, setCurrentPlayerId] = useState();

    const noPendingChallenge = useSelector(
        (state) =>
            state.onliners &&
            state.onliners.filter((status) => status.accepted == null)
    );
    //console.log("noPendingChallenge", noPendingChallenge);

    const challengedPlayers = useSelector(
        (state) =>
            state.onliners &&
            state.onliners.filter(
                (status) =>
                    status.accepted === false &&
                    status.sender_id === currentPlayerId
            )
    );
    //console.log("challengedPlayers", challengedPlayers);

    const challengingPlayers = useSelector(
        (state) =>
            state.onliners &&
            state.onliners.filter((status) => status.accepted === true)
    );
    //console.log("challengingPlayers", challengingPlayers);

    useEffect(() => {
        socket.on("current player", (data) => {
            setCurrentPlayerId(data.currentPlayer);
        });
    }, [currentPlayerId]);

    const clickButton = (otherUserId, event) => {
        socket.emit("button click", {
            otherUserId: otherUserId,
            buttonText: event.target.innerText,
        });
    };

    const noChallenge = (
        <div className="onliners">
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
        <div className="onliners">
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
        <div className="onliners">
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
            <h1>Onliners</h1>
            <ChallengeAlert />
            {noChallenge}
            {challengers}
            {challenged}
        </div>
    );
}
