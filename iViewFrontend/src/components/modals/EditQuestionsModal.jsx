import React, { useState, useEffect } from 'react';

function EditQuestionsModal({ isOpen, onClose, question, onUpdate }) {
    const [editedQuestion, setEditedQuestion] = useState(question);

    useEffect(() => {
        setEditedQuestion(question); // Modal açıldığında soru güncelleniyor
    }, [question]);

    const handleUpdate = () => {
        onUpdate(editedQuestion); // Güncelleme işlemi
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
                <h3 className="text-xl mb-4 text-indigo-700">Edit Question</h3>
                <textarea
                    value={editedQuestion.text}
                    onChange={(e) => setEditedQuestion({ ...editedQuestion, text: e.target.value })}
                    className="border border-gray-300 p-2 rounded-md w-full mb-4"
                    maxLength={100}
                ></textarea>

                <div className="mb-4">
                    <label>Time (1-60 min):</label>
                    <input
                        type="number"
                        min="1"
                        max="60"
                        value={editedQuestion.time}
                        onChange={(e) => setEditedQuestion({ ...editedQuestion, time: e.target.value })}
                        className="border border-gray-300 p-2 rounded-md w-20 ml-2"
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2"
                        onClick={handleUpdate}
                    >
                        Update
                    </button>
                    <button
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditQuestionsModal;
