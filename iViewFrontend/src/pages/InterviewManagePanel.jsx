import { useState, useEffect } from 'react';
import InterviewsList from '../components/InterviewsList';
import AddInterviewModal from '../components/modals/AddInterviewModal';
import AddButton from '../components/buttons/AddButton';
import { useInterviewStore } from '../stores/useInterviewStore'; 
import { useQuestionStore } from '../stores/useQuestionStore';

function InterviewManagePanel() {
    const { interviews, fetchInterviews, addInterview, deleteInterview, editInterview, togglePublished } = useInterviewStore(); // togglePublished ekliyoruz
    const { questions, fetchQuestions } = useQuestionStore();
    const [isAddModalOpen, setAddModalOpen] = useState(false); 
    const [selectedInterview, setSelectedInterview] = useState(null);

    useEffect(() => {
        console.log("veriler geliy")
        fetchInterviews(); 
        fetchQuestions();
    }, [fetchInterviews, fetchQuestions]);

    const handleAddInterview = (newInterview) => {
        if (selectedInterview) {
            editInterview({ ...selectedInterview, ...newInterview });
            setSelectedInterview(null);
        } else {
            addInterview(newInterview);
        }
        setAddModalOpen(false);
    };

    const handleDeleteInterview = (id) => {
        deleteInterview(id);
    };

    const handleEditInterview = (interview) => {
        setSelectedInterview(interview);
        setAddModalOpen(true);
    };

    const handleTogglePublished = (id, currentStatus) => {
        togglePublished(id, currentStatus);
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold text-indigo-700 mb-6">Interview Manage Panel</h2>

            <AddButton onClick={() => {
                setSelectedInterview(null);
                setAddModalOpen(true);
            }} />

            <InterviewsList
                interviews={interviews}
                togglePublished={handleTogglePublished} // Her interview için durumu değiştiren fonksiyonu çağırıyoruz
                onDelete={handleDeleteInterview}
                onEdit={handleEditInterview}
            />

            <AddInterviewModal
                isOpen={isAddModalOpen}
                onClose={() => setAddModalOpen(false)}
                onAdd={handleAddInterview}
                interview={selectedInterview}
                questions={questions}
            />
        </div>
    );
}

export default InterviewManagePanel;
