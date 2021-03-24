import io from "socket.io-client";
export let socket;
import { receiveOnlinersList } from "./actions";

export const init = (store) => {
    //make sure 1user has one socket independly fron the number f open tabs
    if (!socket) {
        socket = io.connect();
    }
    socket.on("online users", (data) => {
        // console.log("online users comes in", data);
        store.dispatch(receiveOnlinersList(data));
    });

    
};
