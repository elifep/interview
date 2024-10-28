import React, { useEffect, useState } from 'react';
import { useQuestionStore } from '../../stores/useQuestionStore';

function AddQuestionModal({ isOpen, onClose, onAdd }) {
  const [question, setQuestion] = useState('');
  const [time, setTime] = useState(2);
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [error, setError] = useState('');

  const categories = useQuestionStore((state) => state.categories);
  const fetchCategories = useQuestionStore((state) => state.fetchCategories);
  const addCategory = useQuestionStore((state) => state.addCategory);

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen, fetchCategories]);

  const handleAdd = () => {
    if (!question) {
      setError('Question cannot be empty.');
      return;
    }

    if (time < 1 || time > 60) {
      setError('Time must be between 1 and 60 minutes.');
      return;
    }

    const newQuestion = { question, time, category };
    onAdd(newQuestion);
    onClose();
  };

  const handleAddCategory = async () => {
    if (customCategory && !categories.some((cat) => cat.name === customCategory)) {
      try {
        await addCategory(customCategory);
        // Yeni kategoriyi ekledikten sonra, kategorileri yeniden çek
        await fetchCategories();
        setCategory(customCategory);
        setCustomCategory('');
      } catch (error) {
        setError('Yeni kategori eklenirken bir hata oluştu.');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
        <h3 className="text-xl mb-4 text-teal-700">Add New Question</h3>

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
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label>Add New Category:</label>
          <input
            type="text"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full mt-2"
            placeholder="Enter new category"
          />
          <button
            onClick={handleAddCategory}
            className="bg-teal-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-teal-600"
          >
            Add New Category
          </button>
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
            className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
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
