import io from "socket.io-client";
export let socket;
import {
    receiveOnlinersNoChallenge,
    receiveOnlinersWithChallenge,
    updateButton,
} from "./actions";

export const init = (store) => {
    if (!socket) {
        socket = io.connect();
    }
    socket.on("onliners challenge status", (data) => {
        //console.log(" onliners challenge status socket.js", data);
        store.dispatch(receiveOnlinersWithChallenge(data));
    });
    socket.on("onliners no challenge", (data) => {
        //console.log("onliners no challenge socket.js", data);
        store.dispatch(receiveOnlinersNoChallenge(data));
    });

    socket.on("update Button", (data) => {
        //console.log("update Button in socket.js", data);
        store.dispatch(updateButton(data));
    });
};
