import io from "socket.io-client";
export let socket;
import { receiveOnliners, updateButton } from "./actions";

export const init = (store) => {
    if (!socket) {
        socket = io.connect();
    }

    socket.on("onliners", (data) => {
        console.log("onliners socket.js", data);
        store.dispatch(receiveOnliners(data));
    });

    socket.on("update Button", (data) => {
        console.log("update Button in socket.js", data);
        store.dispatch(updateButton(data));
    });
};
