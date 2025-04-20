import { useState, useEffect } from "react";

const Countdown = ({refreshes_at}) => {
    const [milliseconds, setMilliseconds] = useState(refreshes_at - Date.now());

    useEffect(() => {
        if (milliseconds <= 0) return; // Stop countdown at 0

        const interval = setInterval(() => {
            setMilliseconds((prev) => prev - 1000);
        }, 1000);

        return () => clearInterval(interval); // Cleanup
    });

    useEffect(() => {
        setMilliseconds(refreshes_at - Date.now());
    }, [refreshes_at])

    const formatTime = () => {
        const totalSeconds = milliseconds / 1000;
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);

        return `${hours}h ${minutes}m ${seconds}s`;
    }

    return (
        <>
            {
                milliseconds > 0 ?
                <>
                    <p id="openPackText">Pack Refreshing</p>
                    <p id="openPackCountdown">{formatTime()}</p>
                </>
                :
                <>
                    <p id="openPackText">Open Pack</p>
                </>
            }

        </>
    )
};

export default Countdown;