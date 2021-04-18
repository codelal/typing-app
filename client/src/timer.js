import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTotalSeconds } from "./actions";

export default function Timer() {
    const [time, setTime] = useState(0);
    const dispatch = useDispatch();
    const timerStatus = useSelector((state) => state && state.timerStatus);

    useEffect(() => {
        let intervalId = 0;

        if (timerStatus == "runs") {
            setTime(1000);
            intervalId = setInterval(() => {
                setTime((prevTime) => prevTime + 1000);
            }, 1000);
            return () => clearInterval(intervalId);
        } else if (timerStatus == "clear") {
            setTime(0);
        }
        dispatch(setTotalSeconds(time / 1000));
    }, [timerStatus]);

    return <p className="timer">{time/1000}Sec</p>;
}
