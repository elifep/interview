import React, { useState, useEffect } from 'react';
import { useQuestionStore } from '../../stores/useQuestionStore'; // Kategorileri mağazadan çekmek için

function EditQuestionModal({ isOpen, onClose, question, onSave }) {
  const [questionText, setQuestionText] = useState('');
  const [timeLimit, setTimeLimit] = useState(2);
  const [category, setCategory] = useState('');

  const categories = useQuestionStore((state) => state.categories); // Kategorileri mağazadan al

  useEffect(() => {
    if (question) {
      setQuestionText(question.questionText);
      setTimeLimit(question.timeLimit);
      setCategory(question.topic);
    }
  }, [question]);

  const handleSave = () => {
    const updatedQuestion = {
      ...question,
      questionText,
      timeLimit,
      topic: category,
    };
    onSave(updatedQuestion);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
        <h3 className="text-xl mb-4 text-indigo-700">Edit Question</h3>

        <input
          type="text"
          placeholder="Edit question text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full mb-4"
        />

        <div className="mb-4">
          <label>Time (1-60 min):</label>
          <input
            type="number"
            value={timeLimit}
            onChange={(e) => setTimeLimit(Number(e.target.value))}
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
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditQuestionModal;
