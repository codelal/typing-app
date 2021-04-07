import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "./socket";

export default function ChallengeOthers() {
    const [currentPlayer, setCurrentPlayer] = useState();
    const onlinePlayersList = useSelector(
        (state) => state && state.onlinePlayersList
    );
    useEffect(() => {
        socket.on("current player", (data) => {
            // console.log("socket current Player comes in", data.currentPlayer);
            setCurrentPlayer(data.currentPlayer);
        });
    }, []);

    const challengePlayer = (id) => {
        socket.emit("challenge player", id);
    };

    const onlinePlayers = (
        <div className="online-players">
            {onlinePlayersList &&
                onlinePlayersList.map((player) => (
                    <div className="online-player" key={player.id}>
                        {currentPlayer != player.id && (
                            <>
                                <p>{player.username} wants to play</p>
                                <button onClick={challengePlayer(player.id)}>
                                    Challenge{" "}
                                </button>
                            </>
                        )}
                    </div>
                ))}
        </div>
    );

    return (
        <>
            <h1>Challenge Others</h1>
            {onlinePlayers}
        </>
    );
}
