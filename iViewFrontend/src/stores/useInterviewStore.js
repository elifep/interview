import { create } from 'zustand';
import axios from 'axios';

export const useInterviewStore = create((set) => ({
    interviews: [],
    loading: false,
    error: null,

    // Mülakatları backend'den çekme
    fetchInterviews: async () => {
        set({ loading: true });
        try {
            const response = await axios.get('http://localhost:5000/api/interview/list', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            set({ interviews: response.data, loading: false });
        } catch (error) {
            console.error('Mülakatlar alınırken hata oluştu:', error);
            set({ error: 'Mülakatlar alınırken bir hata oluştu', loading: false });
        }
    },

    // Yeni mülakat ekleme fonksiyonu
    addInterview: async (newInterview) => {
        set({ loading: true });
        try {
            const response = await axios.post('http://localhost:5000/api/interview/create', newInterview, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            set((state) => ({
                interviews: [...state.interviews, response.data],
                loading: false,
            }));
        } catch (error) {
            console.error('Mülakat eklenirken hata oluştu:', error);
            set({ error: 'Mülakat eklenirken bir hata oluştu', loading: false });
        }
    },

    // Mülakat düzenleme fonksiyonu
    editInterview: async (updatedInterview) => {
        set({ loading: true });
        try {
            const response = await axios.put(`http://localhost:5000/api/interview/update/${updatedInterview.id}`, updatedInterview, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            set((state) => ({
                interviews: state.interviews.map((interview) =>
                    interview._id === updatedInterview._id ? response.data : interview
                ),
                loading: false,
            }));
        } catch (error) {
            console.error('Mülakat güncellenirken hata oluştu:', error);
            set({ error: 'Mülakat güncellenirken bir hata oluştu', loading: false });
        }
    },

    // Published durumu değiştirme işlevi
    togglePublished: async (id, currentPublishedStatus) => {
        try {
            const updatedStatus = !currentPublishedStatus;
            const response = await axios.put(`http://localhost:5000/api/interview/publish/${id}`, {
                published: updatedStatus,
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            set((state) => ({
                interviews: state.interviews.map((interview) =>
                    interview._id === id ? { ...interview, published: updatedStatus } : interview
                ),
            }));
        } catch (error) {
            console.error('Published durumu güncellenirken hata oluştu:', error);
        }
    },

    // Mülakat silme fonksiyonu
    deleteInterview: async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/interview/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            set((state) => ({
                interviews: state.interviews.filter((interview) => interview._id !== id),
            }));
        } catch (error) {
            console.error('Mülakat silinirken hata oluştu:', error);
        }
    },
    // Yalnızca yayınlanmış mülakatları fetch etme
    fetchPublishedInterviews: async () => {
        set({ loading: true, error: null });

        // Token'ı localStorage'den al
        const token = localStorage.getItem('token');
        if (!token) {
            set({ error: 'Kullanıcı yetkilendirilmedi, lütfen giriş yapın.', loading: false });
            return;
        }

        try {
            const response = await axios.get('http://localhost:5000/api/interview/published', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Gelen yanıtın geçerli olup olmadığını kontrol edin
            if (response.status === 200 && Array.isArray(response.data)) {
                set({ interviews: response.data, loading: false });
            } else {
                throw new Error('Geçersiz yanıt alındı');
            }
        } catch (error) {
            console.error('Yayınlanmış mülakatlar alınırken hata oluştu:', error);

            // Hata mesajını daha spesifik hale getirme
            let errorMessage = 'Yayınlanmış mülakatlar alınırken hata oluştu';
            if (error.response) {
                if (error.response.status === 401) {
                    errorMessage = 'Yetkisiz erişim: Lütfen giriş yapın.';
                } else if (error.response.status === 403) {
                    errorMessage = 'Erişim engellendi: Bu işlem için izniniz yok.';
                } else {
                    errorMessage = `Hata: ${error.response.status} - ${error.response.data.message || 'Bilinmeyen hata'}`;
                }
            }

            set({ error: errorMessage, loading: false });
        }
    },
}));
