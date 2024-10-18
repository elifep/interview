import React from 'react';
import DeleteButton from './DeleteButton';

function QuestionRow({ question, index, handleDelete }) {
    return (
        <div className="grid grid-cols-[1fr_3fr_1fr_1fr] gap-4 items-center p-4 bg-white rounded-md shadow-sm">
            <div>{index + 1}</div>
            <div>{question.question}</div>
            <div>{question.time} min</div>
            <div>
                <DeleteButton onDelete={() => handleDelete(question.id)} />
            </div>
        </div>
    );
}

export default QuestionRow;
