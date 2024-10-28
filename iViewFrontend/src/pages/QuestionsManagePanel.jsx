import { useState, useEffect } from 'react'; // useEffect kancasını ekliyoruz
import QuestionsList from '../components/QuestionsList';
import FilterDropdown from '../components/FilterDropdown';
import AddButton from '../components/buttons/AddButton';
import AddQuestionsModal from '../components/modals/AddQuestionsModal'; // Modal'ı import ediyoruz.
import EditQuestionModal from '../components/modals/EditQuestionModal'; // Düzenleme modali
import { useQuestionStore } from '../stores/useQuestionStore'; // Store'dan veri çekmek için import ediyoruz.

function QuestionsManagePanel() {
    const { questions, fetchQuestions, addQuestion, deleteQuestion, editQuestion, loading, error, categories, fetchCategories } = useQuestionStore(); // Soru güncelleme fonksiyonunu da ekledik
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [filter, setFilter] = useState('All');
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    // Sayfa yüklendiğinde soruları ve kategorileri backend'den çek
    useEffect(() => {
        fetchQuestions();
        fetchCategories();
    }, [fetchQuestions, fetchCategories]);

    useEffect(() => {
        // Sorular veya filtre değiştikçe filtrelenmiş soruları günceller
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
        addQuestion(newQuestion);
        setAddModalOpen(false);
    };

    // Soru silme işlemi
    const handleDelete = (id) => {
        deleteQuestion(id);
    };

    // Soru düzenleme işlemi
    const handleEdit = (question) => {
        setSelectedQuestion(question);
        setEditModalOpen(true);
    };

    // Soru kaydetme işlemi (düzenleme sonrası)
    const handleSaveEdit = (updatedQuestion) => {
        editQuestion(updatedQuestion);
        setEditModalOpen(false);
        setSelectedQuestion(null);
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
