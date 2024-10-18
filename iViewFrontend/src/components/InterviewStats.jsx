import React from 'react';

function InterviewStats({ total, onHold }) {
    return (
        <div className="flex justify-between bg-gray-100 p-4 rounded-md border border-gray-300 mt-2">
            <div className="text-center">
                <span className="block text-2xl font-bold">{total}</span>
                <span className="text-sm text-gray-500">TOTAL</span>
            </div>
            <div className="text-center">
                <span className="block text-2xl font-bold">{onHold}</span>
                <span className="text-sm text-gray-500">ON HOLD</span>
            </div>
        </div>
    );
}

export default InterviewStats;
