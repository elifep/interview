import axios from 'axios';
import { create } from 'zustand';

export const useInterviewStore = create((set, get) => ({
  interview: null,
  questions: [],
  isLoading: false,
  error: null,
  personalInfoSubmitted: false, // Bilgilerin gönderilip gönderilmediği durumu
  
  currentQuestionIndex: 0, // Varsayılan başlangıç sorusu
  timeRemaining: 0,
  totalTimeRemaining: 0,
  setTimeRemaining: (time) => set({ timeRemaining: time }),
  setTotalTimeRemaining: (time) => set({ totalTimeRemaining: time }),

  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
  setInterview: (interview) => {
    if (interview && interview.questions && interview.questions.length > 0) {
        // Calculate total duration in minutes and store it in the state
        const totalTime = interview.questions.reduce((acc, q) => acc + (q.timeLimit || 0), 0); // Total time in minutes
        set({
            interview,
            totalTimeRemaining: totalTime * 60, // Convert to seconds for countdown logic if needed
            currentQuestionIndex: 0,
            timeRemaining: interview.questions[0].timeLimit * 60, // First question time in seconds
        });
    } else {
        console.error("Invalid interview data or no questions found.");
        set({
            interview: null,
            totalTimeRemaining: 0,
            timeRemaining: 0,
        });
    }
},


  nextQuestion: () => {
    const currentQuestionIndex = get().currentQuestionIndex;
    const interview = get().interview;

    if (interview && currentQuestionIndex < interview.questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      set({
        currentQuestionIndex: nextIndex,
        timeRemaining: interview.questions[nextIndex]?.timeLimit * 60 || 120, // Set time for the next question, default to 2 minutes if missing
      });
    } else {
      console.log("Reached last question or no questions available.");
      // If all questions have been completed, handle the end of the interview here
    }
  },

  // Inside useInterviewStore.js

// Inside useInterviewStore.js

decrementTime: () => {
  const { timeRemaining, totalTimeRemaining, nextQuestion, setTimeRemaining, setTotalTimeRemaining } = get();

  // Log the current values for debugging
  console.log('Time Remaining:', timeRemaining);
  console.log('Total Time Remaining:', totalTimeRemaining);

  if (timeRemaining > 0) {
    // Decrease the remaining time for the current question
    setTimeRemaining(timeRemaining - 1);
  } else if (timeRemaining === 0) {
    // When the time for the current question runs out, move to the next question
    nextQuestion();
  }

  if (totalTimeRemaining > 0) {
    // Decrease the total interview time remaining
    setTotalTimeRemaining(totalTimeRemaining - 1);
  } else {
    // Stop the interview if total time runs out
    console.log("Total interview time is over");
    setTimeRemaining(0);
    setTotalTimeRemaining(0);
  }
},


  // setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
  
  skipQuestion: () => set((state) => ({
    currentQuestionIndex: state.currentQuestionIndex + 1, // Sonraki soruya geç
  })),
  

//  timeRemaining: 120, // Varsayılan süre (saniye)
//   setInterview: (interview) => set((state) => ({
//     ...state,
//     interview: interview, // Yeni mülakatı set et
//   })),
  // Mülakat bilgilerini backend'den çekme fonksiyonu
  fetchInterview: async (uniqueId) => {
    set({ isLoading: true, error: null });
    try {
      // Step 1: Fetch the interview details using the initial API endpoint
      const initialResponse = await axios.get(`http://localhost:5000/api/application/apply/${uniqueId}`);
      const interviewDetails = initialResponse.data;
  
      console.log('Interview details response:', interviewDetails);
  
      // Extract the interviewId from the response
      const interviewId = interviewDetails?._id;
  
      if (!interviewId) {
        throw new Error('Interview ID not found in response');
      }
  
      // Step 2: Fetch the full interview questions using the correct interview ID
      const questionsResponse = await axios.get(`http://localhost:5000/api/interview/start/${interviewId}`);
      const questions = questionsResponse.data;
  
      console.log('Questions response:', questions);
  
      // Ensure questions are in the correct structure
      if (!Array.isArray(questions) || questions.length === 0) {
        throw new Error('No questions found in this interview');
      }
  
      // Update the state with fetched interview details and questions
      set({
        interview: {
          ...interviewDetails,
          questions, // Merging questions into the interview object
        },
        currentQuestionIndex: 0,
        timeRemaining: questions[0]?.timeLimit || 120,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error loading interview:', error);
      set({ error: 'Failed to load interview details', isLoading: false });
    }
  },


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
  completeQuestion: () => {
    // Sorular tamamlandığında yapılacak işlemler
  },

}));