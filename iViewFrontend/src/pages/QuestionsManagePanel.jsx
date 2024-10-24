import { useState, useEffect } from 'react'; // useEffect kancasını ekliyoruz
import QuestionsList from '../components/QuestionsList';
import FilterDropdown from '../components/FilterDropdown';
import AddButton from '../components/buttons/AddButton';
import AddQuestionsModal from '../components/modals/AddQuestionsModal'; // Modal'ı import ediyoruz.
import { useQuestionStore } from '../stores/useQuestionStore'; // Store'dan veri çekmek için import ediyoruz.

function QuestionsManagePanel() {
    const { questions, fetchQuestions, addQuestion, deleteQuestion, loading, error } = useQuestionStore(); // Soruları fetch etmek için `fetchQuestions` ekledik
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [filter, setFilter] = useState('All');
    const [isAddModalOpen, setAddModalOpen] = useState(false); // Ekleme modal kontrolü
    const [isEditModalOpen, setEditModalOpen] = useState(false); // Düzenleme modal kontrolü
    const [selectedQuestion, setSelectedQuestion] = useState(null); // Düzenlenecek soruyu kaydetmek için state

    // Sayfa yüklendiğinde soruları backend'den çek
    useEffect(() => {
        fetchQuestions(); // Soruları backend'den çekiyoruz
    }, [fetchQuestions]);

    // Sorular değiştikçe filtrelenmiş soruları günceller
    useEffect(() => {
        if (filter === 'All') {
            setFilteredQuestions(questions);
        } else {
            setFilteredQuestions(questions.filter(q => q.topic === filter));
        }
    }, [questions, filter]);

    // Filtreleme işlemi
    const handleFilter = (selectedFilter) => {
        setFilter(selectedFilter);
        if (selectedFilter === 'All') {
            setFilteredQuestions(questions);
        } else {
            setFilteredQuestions(questions.filter(q => q.topic === selectedFilter));
        }
    };

    // Soru ekleme işlemi
    const handleAddQuestion = (newQuestion) => {
        addQuestion(newQuestion); // Yeni soru store'a ekleniyor
        setAddModalOpen(false); // Modal kapatılıyor
    };

    // Soru silme işlemi
    const handleDelete = (id) => {
        console.log(`Deleting question with ID: ${id}`);
        deleteQuestion(id); // Soru store'dan siliniyor
    };

    // Soru düzenleme işlemi
    const handleEdit = (question) => {
        setSelectedQuestion(question); // Düzenlenecek soruyu seçiyoruz
        setEditModalOpen(true); // Edit modali açılıyor
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold text-indigo-700 mb-6">Questions Manage Panel</h2>

            {/* Yüklenme durumu */}
            {loading && <p>Loading questions...</p>}
            {/* Hata durumu */}
            {error && <p className="text-red-600">Error: {error}</p>}

            <div className="flex justify-between items-center mb-4">
                <FilterDropdown filters={['All', 'Frontend', 'Backend']} onFilter={handleFilter} />
                <AddButton onClick={() => setAddModalOpen(true)} /> {/* Butona tıklayınca modal açılıyor */}
            </div>

            {/* Soru  Listesi */}
            {!loading && !error && (
                <QuestionsList questions={filteredQuestions} onDelete={handleDelete} onEdit={handleEdit} />
            )}

            {/* Add Question Modal */}
            <AddQuestionsModal
                isOpen={isAddModalOpen}
                onClose={() => setAddModalOpen(false)}
                onAdd={handleAddQuestion}
            />

            {/* Düzenleme Modalı */}
            {selectedQuestion && (
                <AddQuestionsModal
                    isOpen={isEditModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    onAdd={handleAddQuestion} // Burada onEdit fonksiyonu düzenlenmiş olabilir
                    question={selectedQuestion} // Düzenlenecek soruyu modal'a geçiriyoruz
                />
            )}
        </div>
    );
}

export default QuestionsManagePanel;
