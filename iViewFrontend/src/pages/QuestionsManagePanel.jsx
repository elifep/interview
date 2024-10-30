import { useState, useEffect } from 'react';
import QuestionsList from '../components/QuestionsList';
import FilterDropdown from '../components/FilterDropdown';
import AddButton from '../components/buttons/AddButton';
import AddQuestionsModal from '../components/modals/AddQuestionsModal';
import EditQuestionModal from '../components/modals/EditQuestionModal';
import { useQuestionStore } from '../stores/useQuestionStore';
import { toast } from 'react-toastify'; // Toastify'ı import ediyoruz

function QuestionsManagePanel() {
    const { questions, fetchQuestions, addQuestion, deleteQuestion, editQuestion, loading, error, categories, fetchCategories } = useQuestionStore();
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [filter, setFilter] = useState('All');
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    useEffect(() => {
        fetchQuestions();
        fetchCategories();
    }, [fetchQuestions, fetchCategories]);

    useEffect(() => {
        if (filter === 'All') {
            setFilteredQuestions(questions);
        } else {
            setFilteredQuestions(questions.filter((q) => q.topic === filter));
        }
    }, [questions, filter]);

    // Filtreleme işlemi
    const handleFilter = (selectedFilter) => {
        setFilter(selectedFilter);
    };

    // Soru ekleme işlemi
    const handleAddQuestion = (newQuestion) => {
        try {
            addQuestion(newQuestion);
            setAddModalOpen(false);
            toast.success('Soru başarıyla eklendi!'); // Başarı mesajı
        } catch (error) {
            toast.error('Soru eklenirken bir hata oluştu.'); // Hata mesajı
        }
    };

    // Soru silme işlemi
    const handleDelete = (id) => {
        try {
            deleteQuestion(id);
            toast.success('Soru başarıyla silindi!'); // Başarı mesajı
        } catch (error) {
            toast.error('Soru silinirken bir hata oluştu.'); // Hata mesajı
        }
    };

    // Soru düzenleme işlemi
    const handleEdit = (question) => {
        setSelectedQuestion(question);
        setEditModalOpen(true);
    };

    // Soru kaydetme işlemi (düzenleme sonrası)
    const handleSaveEdit = (updatedQuestion) => {
        try {
            editQuestion(updatedQuestion);
            setEditModalOpen(false);
            setSelectedQuestion(null);
            toast.success('Soru başarıyla güncellendi!'); // Başarı mesajı
        } catch (error) {
            toast.error('Soru güncellenirken bir hata oluştu.'); // Hata mesajı
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-6">Questions Manage Panel</h2>

            {loading && <p>Loading questions...</p>}
            {error && <p className="text-red-600">Error: {error}</p>}

            <div className="flex justify-between items-center mb-4">
                <FilterDropdown filters={['All', ...categories.map((cat) => cat.name)]} onFilter={handleFilter} />
                <AddButton onClick={() => setAddModalOpen(true)} />
            </div>

            {!loading && !error && (
                <QuestionsList questions={filteredQuestions} onDelete={handleDelete} onEdit={handleEdit} />
            )}

            <AddQuestionsModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} onAdd={handleAddQuestion} />

            {selectedQuestion && (
                <EditQuestionModal
                    isOpen={isEditModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    question={selectedQuestion}
                    onSave={handleSaveEdit}
                />
            )}
        </div>
    );
}

export default QuestionsManagePanel;
