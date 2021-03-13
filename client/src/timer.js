import { useEffect, useState } from "react";

export default function Timer({ timerOn }) {
    const [time, setTime] = useState(0);

    console.log("timerOn in timer", timerOn);

    useEffect(() => {
        let interval = null;

        if (timerOn) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1000);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timerOn]);

    return (
        <>
            <h3>Timer</h3>
            <div>{time / 1000} Seconds</div>
        </>
    );
}
