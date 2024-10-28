import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuestionStore } from '../../stores/useQuestionStore';
import { useInterviewStore } from '../../stores/useInterviewStore';

function AddInterviewModal({ isOpen, onClose, onAdd }) {
    const { questions, fetchQuestions, categories, fetchCategories } = useQuestionStore();
    const { addInterview } = useInterviewStore();
    const [interviewTitle, setInterviewTitle] = useState('');
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [expireDate, setExpireDate] = useState('');
    const [canSkip, setCanSkip] = useState(false);
    const [showAtOnce, setShowAtOnce] = useState(false);
    const [packageFilter, setPackageFilter] = useState('All');

    useEffect(() => {
        if (isOpen) {
            fetchQuestions();
            fetchCategories();
        }
    }, [isOpen, fetchQuestions, fetchCategories]);

    const handleAddInterview = () => {
        if (!expireDate) {     // Tarih kontrolü
            alert('Please select an expiration date.');
            return;
        }

        const expireDateObj = new Date(expireDate);
        const today = new Date();
        
        if (isNaN(expireDateObj.getTime())) {     // Geçersiz tarih kontrolü
            alert('Invalid date. Please select a valid expiration date.');
            return;
        }
        if (expireDateObj <= today) {     // Tarihin gelecekte olduğundan emin ol
            alert('The expiration date must be in the future.');
            return;
        }
        if (!canSkip && !showAtOnce) {     // Kullanıcı tercihi kontrolü
            alert('Either "Can Skip" or "Show At Once" must be selected.');
            return;
        }   

        const newInterview = { // Yeni mülakat verilerini oluşturma
            title: interviewTitle,
            questions: selectedQuestions,
            expirationDate: expireDateObj.toISOString(),
            canSkip,
            showAtOnce,
        };
        console.log("Adding new interview:", newInterview);  // Yeni mülakatı ekleme
    
        try {
            onAdd(newInterview);
        } catch (error) {
            console.error("Failed to add interview:", error);
            alert("An error occurred while adding the interview. Please try again.");
            return;
        }
        onClose(); // Modalı kapatma
    };    

    const handleSelectQuestion = (id) => {
        if (!selectedQuestions.includes(id)) {
            setSelectedQuestions([...selectedQuestions, id]);
        }
    };

    const handleDeselectQuestion = (id) => {
        setSelectedQuestions(selectedQuestions.filter(qId => qId !== id));
    };

    const filteredQuestions = packageFilter === 'All'
        ? questions
        : questions.filter((q) => q.topic === packageFilter);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
                <h3 className="text-xl mb-4 text-teal-700">Create Interview</h3>
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
                                    const question = questions.find(q => q._id === id);
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
                        onClick={handleAddInterview}
                    >
                        Create
                    </button>
                   
                </div>
            </div>
        </div>
    );
}

AddInterviewModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
};

export default AddInterviewModal;
