import React from 'react';

const Timer = ({ time, label }) => {
    // Convert time to MM:SS format
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return (
        <div className="bg-gray-100 px-4 py-2 rounded shadow-sm">
            <span className="font-semibold">{label}:</span>
            <span className="ml-2">{`${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</span>
        </div>
    );
};

export default Timer;
