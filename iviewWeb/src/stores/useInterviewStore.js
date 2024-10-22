import axios from 'axios';
import { create } from 'zustand';

export const useInterviewStore = create((set) => ({
  interview: null,
  questions: [],
  isLoading: false,
  error: null,
  personalInfoSubmitted: false, // Bilgilerin gönderilip gönderilmediği durumu
  
  currentQuestionIndex: 0, // Varsayılan başlangıç sorusu
 

  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
  
  skipQuestion: () => set((state) => ({
    currentQuestionIndex: state.currentQuestionIndex + 1, // Sonraki soruya geç
  })),
  
  completeQuestion: () => {
    // Tamamlanan soru işlevi
  },
 timeRemaining: 120, // Varsayılan süre (saniye)
  setInterview: (interview) => set((state) => ({
    ...state,
    interview: interview, // Yeni mülakatı set et
  })),
  // Mülakat bilgilerini backend'den çekme fonksiyonu
  fetchInterview: async (uniqueId) => {
    set({ isLoading: true, error: null });
    try {
        const response = await axios.get(`http://localhost:5000/api/application/apply/${uniqueId}`);
        const interview = response.data;

        // Eğer interview.questions boş geliyorsa bu aşamada kontrol edebilirsiniz
        if (!interview.questions || interview.questions.length === 0) {
            throw new Error('No questions found in this interview');
        }

        set({ interview, isLoading: false });
    } catch (error) {
        console.error('Error loading interview:', error);
        set({ error: 'Failed to load interview details', isLoading: false });
    }
},


  skipQuestion: () => set((state) => {
    const nextIndex = state.currentQuestionIndex + 1;
    if (nextIndex < state.questions.length) {
      return {
        currentQuestionIndex: nextIndex,
        timeRemaining: state.questions[nextIndex].timeLimit,
      };
    }
    return state;
  }),

  // Kişisel bilgileri gönderme fonksiyonu
  submitPersonalInfo: async (formData) => {
    // try {
    //   set({ isLoading: true });
      
    //   const token = localStorage.getItem('token'); // Token'ı alıyoruz, gerekiyorsa

    //   // API'ye POST isteği ile form verilerini gönderiyoruz
    //   await axios.post('http://localhost:5000/api/application/personal-info', formData, {
    //     headers: {
    //       'Authorization': `Bearer ${token}`,
    //     },
    //   });

    //   set({ personalInfoSubmitted: true, isLoading: false });
    // } catch (error) {
    //   console.error('Kişisel bilgiler gönderilirken hata oluştu:', error);
    //   set({ error: 'Kişisel bilgiler gönderilirken hata oluştu', isLoading: false });
    // }
     // Geçici olarak, kişisel bilgi gönderildiğinde personalInfoSubmitted'i true yapıyoruz
     set({ personalInfoSubmitted: true });
  },

  // Mülakat bilgilerini backend'den çekme fonksiyonu
//   fetchInterview: async (uniqueId) => {
//     set({ isLoading: true, error: null });
//     try {
//       const response = await axios.get(`http://localhost:5000/api/application/apply/${uniqueId}`);
//       const interview = response.data;
      
//       // Tüm soruları /list API'sinden alıyoruz
//       await set().fetchQuestions();

//       set({ interview, isLoading: false });
//     } catch (error) {
//       console.error('Mülakat yüklenirken hata oluştu:', error);
//       set({ error: 'Mülakat bilgileri yüklenemedi', isLoading: false });
//     }
//   },

  completeQuestion: () => {
    // Sorular tamamlandığında yapılacak işlemler
  },

}));