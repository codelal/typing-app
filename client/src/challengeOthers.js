import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { challengePlayer } from "./actions";
import { socket } from "./socket";

export default function ChallengeOthers() {
    const dispatch = useDispatch();
    const hideRegister = useSelector((state) => state && state.hideRegister);
    const onlinePlayersList = useSelector(
        (state) => state && state.onlinersList
    );

    console.log("onlinePlayersList", onlinePlayersList);

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
