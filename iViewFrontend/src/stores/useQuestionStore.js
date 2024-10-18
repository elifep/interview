import { create } from 'zustand';
import axios from 'axios'; // API çağrıları için axios'u ekliyoruz

// Helper function: Axios isteklerine token ekler
const getAuthHeader = () => {
  const token = localStorage.getItem('token'); // localStorage'dan token alıyoruz
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const useQuestionStore = create((set) => ({
  questions: [], // Başlangıçta boş soru listesi
  loading: false, // Yüklenme durumu
  error: null, // Hata durumu
  // Soruları backend'den çekme fonksiyonu
  fetchQuestions: async () => {
      try {
          const token = localStorage.getItem('token');
          if (!token) {
              throw new Error('Token bulunamadı, lütfen tekrar giriş yapın.');
          }

          const response = await axios.get('http://localhost:5000/api/question/list', {
              headers: {
                  'Authorization': `Bearer ${token}`,
              },
          });

          set({ questions: response.data });
      } catch (error) {
          console.error('Sorular alınırken hata oluştu:', error);
          set({ error: 'Sorular alınırken bir hata oluştu' });
      }
  },

  // Yeni soru ekleme fonksiyonu 
  addQuestion: async (newQuestion) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('http://localhost:5000/api/question/add', {
        questionText: newQuestion.question,
        timeLimit: newQuestion.time,
        topic: newQuestion.category,
      }, {
        headers: getAuthHeader() // Token doğrulaması için headers ekliyoruz
      });

      set((state) => ({
        questions: [...state.questions, response.data.question],
        loading: false,
      }));
    } catch (error) {
      console.error('Soru eklenirken hata oluştu:', error);
      set({ error: 'Soru eklenirken bir hata oluştu', loading: false });
    }
  },

  // Soru silme fonksiyonu
  deleteQuestion: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`http://localhost:5000/api/question/delete/${id}`, {
        headers: getAuthHeader() // Token doğrulaması için headers ekliyoruz
      });
      set((state) => ({
        questions: state.questions.filter((question) => question._id !== id), // Silinen soruyu listeden çıkar
        loading: false,
      }));
    } catch (error) {
      console.error('Soru silinirken hata oluştu:', error);
      set({ error: 'Soru silinirken bir hata oluştu', loading: false });
    }
  },

  // Soru düzenleme fonksiyonu
  editQuestion: async (updatedQuestion) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(`http://localhost:5000/api/question/update/${updatedQuestion.id}`, {
        questionText: updatedQuestion.question,
        timeLimit: updatedQuestion.time,
        topic: updatedQuestion.category,
      }, {
        headers: getAuthHeader() // Token doğrulaması için headers ekliyoruz
      });
      console.log("Gelen Veriler:", response.data); // Gelen verileri loglayalım
      set((state) => ({
        questions: state.questions.map((question) =>
          question._id === updatedQuestion.id ? response.data.question : question
        ),
        loading: false,
      }));
    } catch (error) {
      console.error('Soru güncellenirken hata oluştu:', error);
      set({ error: 'Soru güncellenirken bir hata oluştu', loading: false });
    }
  },
}));