import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuestionStore } from '../../stores/useQuestionStore';
import { useInterviewStore } from '../../stores/useInterviewStore';

function EditInterviewModal({ isOpen, onClose, onSave, interview }) {
    const { questions, fetchQuestions, categories, fetchCategories } = useQuestionStore();
    const { editInterview } = useInterviewStore();

    const [interviewTitle, setInterviewTitle] = useState(interview?.title || '');
    const [selectedQuestions, setSelectedQuestions] = useState(interview?.questions || []);
    const [expireDate, setExpireDate] = useState(interview?.expirationDate || '');
    const [canSkip, setCanSkip] = useState(interview?.canSkip || false);
    const [showAtOnce, setShowAtOnce] = useState(interview?.showAtOnce || false);
    const [packageFilter, setPackageFilter] = useState('All');

    useEffect(() => {
        if (isOpen) {
            fetchQuestions();
            fetchCategories();
            // Edit edilen interview bilgilerini state'e set ediyoruz
            setInterviewTitle(interview?.title || '');
            setSelectedQuestions(interview?.questions || []);
            setExpireDate(interview?.expirationDate.split('T')[0] || '');
            setCanSkip(interview?.canSkip || false);
            setShowAtOnce(interview?.showAtOnce || false);
        }
    }, [isOpen, fetchQuestions, fetchCategories, interview]);

    const handleSaveInterview = () => {
        if (!expireDate) {
            alert('Please select an expiration date.');
            return;
        }

        const expireDateObj = new Date(expireDate);
        const today = new Date();

        if (isNaN(expireDateObj.getTime())) {
            alert('Invalid date. Please select a valid expiration date.');
            return;
        }

        if (expireDateObj <= today) {
            alert('The expiration date must be in the future.');
            return;
        }

        if (!canSkip && !showAtOnce) {
            alert('Either "Can Skip" or "Show At Once" must be selected.');
            return;
        }

        const updatedInterview = {
            ...interview,
            title: interviewTitle,
            questions: selectedQuestions,
            expirationDate: expireDateObj.toISOString(),
            canSkip,
            showAtOnce,
        };

        try {
            onSave(updatedInterview);
        } catch (error) {
            console.error("Failed to save interview:", error);
            alert("An error occurred while saving the interview. Please try again.");
            return;
        }
        onClose();
    };

    const handleSelectQuestion = (id) => {
        if (!selectedQuestions.includes(id)) {
            setSelectedQuestions([...selectedQuestions, id]);
        }
    };

    const handleDeselectQuestion = (id) => {
        setSelectedQuestions(selectedQuestions.filter((qId) => qId !== id));
    };

    const filteredQuestions = packageFilter === 'All'
        ? questions
        : questions.filter((q) => q.topic === packageFilter);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
                <h3 className="text-xl mb-4 text-teal-700">Edit Interview</h3>
                <input
                    type="text"
                    placeholder="Interview Title"
                    value={interviewTitle}
                    onChange={(e) => setInterviewTitle(e.target.value)}
                    className="border border-gray-300 p-2 rounded-md w-full mb-4"
                />

                <div className="mb-4">
                    <label>Filter Package:</label>
                    <select
                        value={packageFilter}
                        onChange={(e) => setPackageFilter(e.target.value)}
                        className="border border-gray-300 p-2 rounded-md w-full mb-4"
                    >
                        <option value="All">All</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    <div className="flex">
                        {/* Available Questions List */}
                        <div className="w-1/2 border border-gray-300 p-2 rounded-md mr-2">
                            <h4 className="font-semibold text-teal-700">Available Questions</h4>
                            <ul className="h-40 overflow-y-auto">
                                {filteredQuestions.map((question) => (
                                    <li key={question._id} className="cursor-pointer hover:bg-gray-200"
                                        onClick={() => handleSelectQuestion(question._id)}>
                                        {question.questionText}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Selected Questions List */}
                        <div className="w-1/2 border border-gray-300 p-2 rounded-md">
                            <h4 className="font-semibold text-teal-700">Selected Questions</h4>
                            <ul className="h-40 overflow-y-auto">
                                {selectedQuestions.map((id) => {
                                    const question = questions.find((q) => q._id === id);
                                    return question ? (
                                        <li key={id} className="cursor-pointer hover:bg-gray-200"
                                            onClick={() => handleDeselectQuestion(id)}>
                                            {question.questionText}
                                        </li>
                                    ) : null;
                                })}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <label>Expire Date:</label>
                    <input
                        type="date"
                        value={expireDate}
                        onChange={(e) => setExpireDate(e.target.value)}
                        className="border border-gray-300 p-2 rounded-md w-full"
                    />
                </div>

                <div className="mb-4 flex space-x-4">
                    <label>Can Skip:</label>
                    <input
                        type="checkbox"
                        checked={canSkip}
                        onChange={() => setCanSkip(!canSkip)}
                        className="ml-2"
                    />
                    <label>Show At Once:</label>
                    <input
                        type="checkbox"
                        checked={showAtOnce}
                        onChange={() => setShowAtOnce(!showAtOnce)}
                        className="ml-2"
                    />
                </div>

                <div className="flex justify-between">
                    <button
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                     <button
                        className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 mr-2"
                        onClick={handleSaveInterview}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

EditInterviewModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    interview: PropTypes.object,
};

export default EditInterviewModal;
