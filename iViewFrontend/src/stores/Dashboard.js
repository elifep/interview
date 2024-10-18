import { create } from 'zustand';
import axios from 'axios'; // API çağrıları için axios'u kullanıyoruz

export const useInterviewStore = create((set) => ({
    interviews: [], // Mülakat verileri
    loading: false, // Yüklenme durumu
    error: null, // Hata durumu

 

    // Yalnızca yayınlanmış mülakatları fetch etme
    fetchPublishedInterviews: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get('http://localhost:5000/api/interview/published');
            set({ interviews: response.data, loading: false });
        } catch (error) {
            console.error('Yayınlanmış mülakatlar alınırken hata oluştu:', error);
            set({ error: 'Yayınlanmış mülakatlar alınırken hata oluştu', loading: false });
        }
    }
}));
