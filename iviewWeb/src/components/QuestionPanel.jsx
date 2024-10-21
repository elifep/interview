import React, { useState, useEffect } from 'react';

const QuestionPanel = ({ question, timeRemaining, onSkip, onDone }) => {
    const [countdown, setCountdown] = useState(timeRemaining);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [timeRemaining]);

    return (
        <div className="flex flex-col h-full justify-between">
            <div className="mb-4">
                <p className="text-gray-700 text-lg leading-relaxed">
                    {question}
                </p>
            </div>

            <div className="mt-4 flex justify-between">
                <button
                    className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                    onClick={onSkip}
                >
                    Skip
                </button>
                <button
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    onClick={onDone}
                >
                    Done
                </button>
            </div>
        </div>
    );
};

export default QuestionPanel;
