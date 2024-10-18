import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore'; // login işlemi için authStore

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const login = useAuthStore((state) => state.login); // Zustand'dan login fonksiyonunu alıyoruz

    const handleLogin = async (e) => {
        e.preventDefault();

        // Gönderilen e-posta ve şifreyi kontrol etmek için console.log ekleyin
        console.log('Gönderilen kullanıcı-adı:', username);
        console.log('Gönderilen şifre:', password);

        // login fonksiyonunu await ile çağırın, çünkü async bir fonksiyon
        const success = await login(username, password);

        if (success) {
            navigate('/');
            console.log("başarılı")
            // Giriş başarılıysa ana sayfaya yönlendir
        } else {
            setError('Invalid username or password.'); // Hatalıysa hata mesajı göster
        }
    };

    // const handleLogin = (e) => {
    //     e.preventDefault();

    //     // login fonksiyonu store'dan alınıyor ve email, password ile çağrılıyor
    //     const success = login(email, password);

    //     if (success) {
    //         navigate('/'); // Giriş başarılıysa ana sayfaya yönlendir
    //     } else {
    //         setError('Invalid email or password.'); // Hatalıysa hata mesajı
    //     }
    // };

    return (
        <div className="flex items-center justify-center h-screen bg-blue-50">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Admin Log in Page</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="username"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Log in
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
