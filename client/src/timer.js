import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSeconds } from "./actions";

export default function Timer() {
    const dispatch = useDispatch();
    const timerIsRunning = useSelector(
        (state) => state && state.timerIsRunning
    );
    const seconds = useSelector((state) => state && state.seconds);
    let intervalId = null;

    useEffect(() => {
        if (timerIsRunning) {
            intervalId = setInterval(() => {
                (prevTime) => prevTime + 1000;
            }, 1000);
            dispatch(setSeconds(intervalId));
        }
        return () => clearInterval(intervalId);
    }, [timerIsRunning, seconds]);

    return <>{seconds && seconds / 1000}Seconds</>;
}
