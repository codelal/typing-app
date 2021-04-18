import { useState, useEffect } from "react";
import Timer from "./Timer";

export default function ProgressBar({ value, maxValue, minValue }) {
    const [error, setError] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (value >= minValue && value <= maxValue) {
            setProgress((value / (maxValue - minValue)) * 100);
        } else {
            setError(true);
            console.log("you provided an invalid value");
        }
    }, [value, maxValue, minValue]);

    return (
        <>
            <div className="progress-bar">
                {!error && (
                    <div
                        className="loading-progress"
                        style={{ width: progress + "%" }}
                    >
                        <Timer />
                    </div>
                )}
                {error && <div className="error">⚠️</div>}
            </div>
        </>
    );
}

// {Math.round(progress)}%
