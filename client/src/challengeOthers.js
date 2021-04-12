import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "./socket";
import { updateOnlinePlayersList, receiveChallengeStatus } from "./actions";

export default function ChallengeOthers() {
    const dispatch = useDispatch();
    const [currentPlayerId, setCurrentPlayerId] = useState();
    const buttonText = useSelector((state) => state && state.challengeStatus);
    const onlinePlayersList = useSelector(
        (state) => state && state.onlinePlayersList
    );

    useEffect(() => {
        socket.on("current player", (data) => {
            console.log("socket current Player comes in", data.currentPlayer);
            setCurrentPlayerId(data.currentPlayer);
            dispatch(receiveChallengeStatus());
        });
    }, []);

    socket.on("update onliners", (data) => {
        // console.log("id update onliners", data);
        dispatch(updateOnlinePlayersList(data));
    });

    socket.on("challenge request", (data) => {
        console.log("challenge request comes in", data);
    });

    const clickButton = (IdChallengedPlayer) => {
        socket.emit("challenge player", IdChallengedPlayer, currentPlayerId);
    };

    const onlinePlayers = (
        <div className="online-players">
            {onlinePlayersList &&
                onlinePlayersList.map((player) => (
                    <div className="online-player" key={player.id}>
                        {currentPlayerId != player.id && (
                            <>
                                <p>
                                    {player.username}
                                    <button
                                        onClick={() => clickButton(player.id)}
                                    >
                                        {buttonText}
                                    </button>
                                </p>
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
