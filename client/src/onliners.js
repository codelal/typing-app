import { useSelector } from "react-redux";

export default function Onliners() {
    const onlinePlayersList = useSelector(
        (state) => state && state.onlineUsersList
    );

    console.log("onlinePlayersList", onlinePlayersList);

    const onlinePlayers = (
        <div className="online-players">
            {onlinePlayersList &&
                onlinePlayersList.map((player) => (
                    <div className="online-player" key={player.id}></div>
                ))}
        </div>
    );

    return (
        <div className="online-users-container">
            <div>{onlinePlayers}</div>
        </div>
    );
}
