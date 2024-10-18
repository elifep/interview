import PropTypes from 'prop-types'; // PropTypes'i import ettik
import { useState, useEffect } from 'react';

function AddInterviewModal({ isOpen, onClose, onAdd }) {
    const [interviewTitle, setInterviewTitle] = useState('');
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [expireDate, setExpireDate] = useState('');
    const [canSkip, setCanSkip] = useState(false);
    const [showAtOnce, setShowAtOnce] = useState(false);
    const [packageFilter, setPackageFilter] = useState('All'); // Paket filtresi için
    const [availableQuestions, setAvailableQuestions] = useState([]); // Veritabanındaki soruları tutacak state

    // Soruları veritabanından çekme işlemi sadece modal açıldığında çalışır
    useEffect(() => {
        if (isOpen) {
            fetchQuestionsFromDB();
        }
    }, [isOpen]);

    const fetchQuestionsFromDB = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/question/list', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            setAvailableQuestions(data);
        } catch (error) {
            console.error('Sorular alınırken hata oluştu:', error);
        }
    };

    const handleAddInterview = async () => {
        const expireDateObj = new Date(expireDate); 
        const today = new Date();
    
        if (expireDateObj <= today) {
            alert('The expire date must be in the future.');
            return;
        }
    
        if (!canSkip && !showAtOnce) {
            alert('Either "Can Skip" or "Show At Once" must be selected.');
            return;
        }
    
        const newInterview = {
            title: interviewTitle,
            questions: selectedQuestions,
            expirationDate: expireDateObj.toISOString(),
            canSkip,
            showAtOnce,
        };
    
        try {
            const response = await fetch('http://localhost:5000/api/interview/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(newInterview),
            });
    
            if (response.ok) {
                const data = await response.json();
                onAdd(data.interview);
                onClose();
            } else {
                const errorData = await response.json();
                alert('Error creating interview: ' + errorData.message);
            }
        } catch {
            alert('An error occurred while creating the interview.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
                <h3 className="text-xl mb-4 text-indigo-700">Create Interview</h3>
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
                        <option value="Frontend">Frontend Package</option>
                        <option value="Backend">Backend Package</option>
                    </select>

                    <label>Select Questions:</label>
                    <select
                        multiple
                        value={selectedQuestions}
                        onChange={(e) =>
                            setSelectedQuestions(Array.from(e.target.selectedOptions, option => option.value))
                        }
                        className="border border-gray-300 p-2 rounded-md w-full"
                    >
                        {availableQuestions.length > 0
                            ? availableQuestions
                                .filter(q => packageFilter === 'All' || q.topic === packageFilter)
                                .map((question) => (
                                    <option key={question._id} value={question._id}>
                                        {question.questionText}
                                    </option>
                                ))
                            : <option disabled>No questions available</option>}
                    </select>
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

                <div className="flex justify-end">
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2"
                        onClick={handleAddInterview}
                    >
                        Add
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

// PropTypes tanımlaması
AddInterviewModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
};

export default AddInterviewModal;
