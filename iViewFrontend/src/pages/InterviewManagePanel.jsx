import { useState, useEffect } from 'react';
import InterviewsList from '../components/InterviewsList';
import AddInterviewModal from '../components/modals/AddInterviewModal';
import EditInterviewModal from '../components/modals/EditInterviewModal';
import AddButton from '../components/buttons/AddButton';
import { useInterviewStore } from '../stores/useInterviewStore';
import { useQuestionStore } from '../stores/useQuestionStore';

function InterviewManagePanel() {
    const { interviews, fetchInterviews, addInterview, deleteInterview, editInterview, togglePublished, loading, error } = useInterviewStore();
    const { questions, fetchQuestions } = useQuestionStore();
    const [filteredInterviews, setFilteredInterviews] = useState([]); // Filtrelenmiş mülakatlar state'i
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false); // Yeni state: Düzenleme modalının kontrolü
    const [selectedInterview, setSelectedInterview] = useState(null);

    // Sayfa yüklendiğinde mülakatları ve soruları backend'den çek
    useEffect(() => {
        fetchInterviews();
        fetchQuestions();
    }, [fetchInterviews, fetchQuestions]);

    // Mülakatlar veya filtre değiştikçe listeyi günceller
    useEffect(() => {
        setFilteredInterviews(interviews);
    }, [interviews]);

    // Mülakat ekleme işlemi
    const handleAddInterview = (newInterview) => {
        addInterview(newInterview); // Yeni mülakat ekleniyor
        setAddModalOpen(false); // Modal kapatılıyor
    };

    // Mülakat düzenleme işlemi
    const handleSaveInterview = (updatedInterview) => {
        editInterview(updatedInterview); // Mülakat düzenleniyor
        setEditModalOpen(false); // Modal kapatılıyor
        setSelectedInterview(null); // Seçili mülakat sıfırlanıyor
    };

    // Mülakat silme işlemi
    const handleDeleteInterview = (id) => {
        if (!id) {
            console.error('Geçersiz ID');
            return;
        }
        deleteInterview(id);
    };

    // Mülakat düzenleme modalını açma
    const handleEditInterview = (interview) => {
        setSelectedInterview(interview);
        setEditModalOpen(true);
    };

    // Yayın durumu değiştirme işlemi
    const handleTogglePublished = (id, currentStatus) => {
        togglePublished(id, currentStatus);
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-6">Interview Manage Panel</h2>

            {/* Yüklenme veya hata mesajları */}
            {loading && <p>Loading interviews...</p>}
            {error && <p className="text-red-600">Error: {error}</p>}

            <AddButton onClick={() => {
                setSelectedInterview(null);
                setAddModalOpen(true);
            }} />

            <InterviewsList
                interviews={filteredInterviews} // Güncellenmiş filtrelenmiş listeyi gönderiyoruz
                togglePublished={handleTogglePublished}
                onDelete={handleDeleteInterview}
                onEdit={handleEditInterview}
            />

            <AddInterviewModal
                isOpen={isAddModalOpen}
                onClose={() => setAddModalOpen(false)}
                onAdd={handleAddInterview}
                questions={questions}
            />

            {selectedInterview && (
                <EditInterviewModal
                    isOpen={isEditModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    onSave={handleSaveInterview}
                    interview={selectedInterview}
                    questions={questions}
                />
            )}
        </div>
    );
}

export default InterviewManagePanel;
