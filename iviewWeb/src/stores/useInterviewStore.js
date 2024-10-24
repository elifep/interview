import axios from 'axios';
import { create } from 'zustand';

export const useInterviewStore = create((set) => ({
  interview: null,
  questions: [], // Sorular burada tutulacak
  isLoading: false,
  error: null,
  personalInfoSubmitted: false,
  currentQuestionIndex: 0,
  timeRemaining: 120, // Varsayılan süre (saniye)

  // Kişisel bilgileri gönderme işlevi (Backend'e POST isteği gönderilebilir)
  submitPersonalInfo: async (formData) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.post('http://localhost:5000/api/application/personal-info', formData);
      
      if (response.status === 200) {
        set({ personalInfoSubmitted: true, isLoading: false });
      } else {
        throw new Error('Bilgiler gönderilirken hata oluştu.');
      }
    } catch (error) {
      console.error('Kişisel bilgiler gönderilirken hata oluştu:', error);
      set({ error: 'Kişisel bilgiler gönderilemedi', isLoading: false });
    }
  },

  // Mülakat bilgilerini uniqueId'ye göre backend'den çekme işlevi
  fetchInterview: async (uniqueId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`http://localhost:5000/api/application/apply/${uniqueId}`);
      const interview = response.data;

      if (!interview.questions || interview.questions.length === 0) {
        throw new Error('Bu mülakata ait soru bulunamadı.');
      }

      set({
        interview,
        questions: interview.questions, // Soruları state'e kaydediyoruz
        currentQuestionIndex: 0, // İlk soruya set et
        timeRemaining: interview.questions[0]?.timeLimit || 120, // İlk sorunun zaman limitini ayarlıyoruz
        isLoading: false,
      });
    } catch (error) {
      console.error('Mülakat bilgileri yüklenirken hata oluştu:', error);
      set({ error: 'Mülakat bilgileri yüklenemedi', isLoading: false });
    }
  },

  // Sonraki soruya geçme işlevi
  skipQuestion: () => set((state) => {
    const nextIndex = state.currentQuestionIndex + 1;
    if (nextIndex < state.questions.length) {
      return {
        currentQuestionIndex: nextIndex,
        timeRemaining: state.questions[nextIndex].timeLimit || 120, // Sonraki sorunun süresini ayarlıyoruz
      };
    }
    return state; // Eğer son soruya ulaşıldıysa, state aynı kalır
  }),

  // Sorular tamamlandığında yapılacak işlemler
  completeQuestion: () => {
    // Burada tamamlanan soruya göre işlemler yapılabilir, backend'e veri gönderilebilir
    console.log("Interview completed.");
  },
}));
