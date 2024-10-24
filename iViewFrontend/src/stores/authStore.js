import { create } from 'zustand';
import axios from 'axios';

export const useAuthStore = create((set) => ({
    isAuthenticated: false, // Giriş durumu
    user: null, // Kullanıcı bilgilerini saklama
    token: localStorage.getItem('token') || null, // localStorage'dan token yükleniyor

    // Oturum durumunu kontrol etme fonksiyonu
    checkAuthStatus: () => {
        const token = localStorage.getItem('token'); // Token olup olmadığını kontrol edin
        if (token) {
            set({ isAuthenticated: true });
        } else {
            set({ isAuthenticated: false });
        }
    },
    // Giriş yapma işlevi
    login: async (username, password) => {
        try {
            const response = await axios.post('http://localhost:5000/api/admin/login', {
                username,
                password,
            });

            if (response.status === 200 && response.data.token) {
                set({ isAuthenticated: true, user: response.data.user, token: response.data.token });

                // Token'ı localStorage'da saklama
                localStorage.setItem('token', response.data.token);

                // Token'ı Axios ile yapılacak her isteğe ekleme
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Login request failed:', error.response ? error.response.data : error.message);
            return false;
        }
    },

    // Çıkış yapma işlevi
    // logout: () => {
    //     set({ isAuthenticated: false, user: null, token: null });
    //     localStorage.removeItem('token'); // Token'ı localStorage'dan silme

    // Axios'tan Authorization başlığını kaldır
    //     delete axios.defaults.headers.common['Authorization'];
    // },
    // Çıkış yapma işlevi
    logout: async () => {
        try {
            console.log('Logout işlemi tetiklendi'); // Logout fonksiyonunun çalıştığını doğrulamak için
            await axios.post('http://localhost:5000/api/admin/logout');

            set({ isAuthenticated: false, user: null, token: null });
            localStorage.removeItem('token'); // Token'ı localStorage'dan silme

            // Axios'tan Authorization başlığını kaldır
            delete axios.defaults.headers.common['Authorization'];
        } catch (error) {
            console.error('Logout request failed:', error.response ? error.response.data : error.message);
        }
    },

    // // Token olup olmadığını kontrol etme
    // checkAuthStatus: () => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         set({ isAuthenticated: true, token });
    //         axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    //     } else {
    //         set({ isAuthenticated: false, token: null });
    //     }
    // },
}));
