import { create } from 'zustand';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;

export const useInterviewStore = create((set) => ({
    interviews: [],
    loading: false,
    error: null,

    // Mülakatları backend'den çekme
    fetchInterviews: async () => {
        set({ loading: true });
        try {
            const response = await axios.get(`${BASE_URL}api/interview/list`, {
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
            const response = await axios.post(`${BASE_URL}/api/interview/create`, newInterview, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            // Dönen veriyi kontrol etme
            console.log('Eklenen mülakat:', response.data);

            // Yeni mülakatı state'e ekleme
            set((state) => {
                console.log('Önceki state:', state.interviews);
                const updatedInterviews = [...state.interviews, response.data];
                console.log('Güncellenmiş state:', updatedInterviews);
                return {
                    interviews: updatedInterviews,
                    loading: false,
                };
            });
        } catch (error) {
            console.error('Mülakat eklenirken hata oluştu:', error);
            set({ error: 'Mülakat eklenirken bir hata oluştu', loading: false });
        }
    },


    // Mülakat düzenleme fonksiyonu
    editInterview: async (updatedInterview) => {
        set({ loading: true });
        try {
            const response = await axios.put(`${BASE_URL}/api/interview/update/${updatedInterview._id}`, updatedInterview, {
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
            const response = await axios.put(`${BASE_URL}/api/interview/publish/${id}`, {
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

    deleteInterview: async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token bulunamadı, lütfen giriş yapın.');
                return;
            }

            const response = await axios.delete(`${BASE_URL}/api/interview/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                console.log('Mülakat başarıyla silindi:', response.data);
            } else {
                console.error('Mülakat silme işlemi başarısız oldu:', response.data);
            }
            set((state) => ({
                interviews: state.interviews.filter((interview) => interview._id !== id),
            }));
        } catch (error) {
            if (error.response) {
                console.error('Sunucu hatası:', error.response.data.message || error.response.data);
            } else if (error.request) {
                console.error('Sunucuya bağlanılamadı veya yanıt alınamadı:', error.request);
            } else {
                console.error('İstek yapılandırmasında hata oluştu:', error.message);
            }
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
            const response = await axios.get(`${BASE_URL}/api/interview/published`, {
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
