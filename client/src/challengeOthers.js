import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "./socket";

export default function ChallengeOthers() {
    const onlinePlayersList = useSelector(
        (state) => state && state.onlinePlayersList
    );

    console.log("onlinePlayersList", onlinePlayersList);

    useEffect(() => {}, [onlinePlayersList]);

    const challengePlayer = (id) => {
        socket.emit("challenge player", id);
    };

    const onlinePlayers = (
        <div className="online-players">
            {onlinePlayersList &&
                onlinePlayersList.map((player) => (
                    <div className="online-player" key={player.id}>
                        {player.username} wants to play
                        <button onClick={challengePlayer(player.id)}>
                            Challenge{" "}
                        </button>
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