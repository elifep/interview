import React, { useState } from 'react';

function AddQuestionModal({ isOpen, onClose, onAdd }) {
    const [question, setQuestion] = useState('');
    const [time, setTime] = useState(2); // Varsayılan süre
    const [category, setCategory] = useState('Frontend'); // Varsayılan kategori
    const [error, setError] = useState('');

    const handleAdd = () => {
        if (question.length === 0) {
            setError('Question cannot be empty.');
            return;
        }

        if (time < 1 || time > 60) {
            setError('Time must be between 1 and 60 minutes.');
            return;
        }

        const newQuestion = { question, time, category };
        onAdd(newQuestion);
        setError(''); // Hataları temizle
        onClose(); // Modal'ı kapat
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
                <h3 className="text-xl mb-4 text-indigo-700">Add New Question</h3>
                
                <input
                    type="text"
                    placeholder="Enter question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="border border-gray-300 p-2 rounded-md w-full mb-4"
                />
                
                <div className="mb-4">
                    <label>Time (1-60 min):</label>
                    <input
                        type="number"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="border border-gray-300 p-2 rounded-md w-20 ml-2"
                        min={1}
                        max={60}
                    />
                </div>

                <div className="mb-4">
                    <label>Category:</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border border-gray-300 p-2 rounded-md w-full"
                    >
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                    </select>
                </div>

                {error && <p className="text-red-600 mb-4">{error}</p>}

                <div className="flex justify-between">
                    <button
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        onClick={handleAdd}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddQuestionModal;
