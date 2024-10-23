import React from 'react';
import Timer from './Timer'; // Ensure the path is correct

const QuestionPanel = ({ question, timeRemaining, onSkip, onDone }) => {
    return (
        <div className="flex flex-col h-full justify-between">
            <div className="mb-4">
                <p className="text-gray-700 text-lg leading-relaxed">
                    {/* Display question text */}
                    {question?.questionText || "No question available"}
                </p>
                <p className="text-sm text-gray-500">
                    Duration: {question?.timeLimit || 0} minutes
                </p>
            </div>

            {/* Use Timer component to display the remaining time */}
            <div className="my-4">
                <Timer time={timeRemaining} label="Time Remaining" />
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
