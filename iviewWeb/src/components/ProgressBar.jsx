import React from 'react';

const ProgressBar = ({ progress }) => {
    return (
        <div className="w-full bg-gray-300 rounded-full h-4">
            <div
                className="bg-indigo-600 h-4 rounded-full"
                style={{ width: `${progress}%` }}
            >
                <span className="text-white text-sm px-2">{progress}%</span>
            </div>
        </div>
    );
};

export default ProgressBar;
