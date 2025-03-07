import { useEffect } from 'react'; 
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';  
import Login from './pages/Login'; 
import { useAuthStore } from './stores/authStore'; 
import Header from './components/Header'; 
import Sidebar from './components/Sidebar'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import InterviewDetail from './pages/InterviewDetail'; 
import VideoCollection from './pages/VideoCollection'; 
import InterviewManagePanel from './pages/InterviewManagePanel'; 
import QuestionsManagePanel from './pages/QuestionsManagePanel';

// Toastify importları
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; // Toastify'ın CSS dosyası

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated); 
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus); 
  const logout = useAuthStore((state) => state.logout);

  // Oturum süresi kontrolü için
  const SESSION_TIMEOUT = 60 * 60 * 1000; // 1 saat (milisaniye cinsinden)

  useEffect(() => {
    checkAuthStatus();

    let logoutTimer;

    // Kullanıcı hareketsizse oturumu kapat
    const resetLogoutTimer = () => {
      if (logoutTimer) clearTimeout(logoutTimer);
      logoutTimer = setTimeout(() => {
        toast.info("Oturumunuz zaman aşımına uğradı, lütfen tekrar giriş yapın."); // Zaman aşımı için toast bildirimi
        logout(); // Otomatik çıkış
      }, SESSION_TIMEOUT);
    };

    // Fare hareketi, tuş basma gibi olayları dinleyelim
    window.addEventListener("mousemove", resetLogoutTimer);
    window.addEventListener("keypress", resetLogoutTimer);

    // Başlangıçta logout timer'ı başlat
    resetLogoutTimer();

    // Bileşen unmount olduğunda event listener'ları temizle
    return () => {
      window.removeEventListener("mousemove", resetLogoutTimer);
      window.removeEventListener("keypress", resetLogoutTimer);
      if (logoutTimer) clearTimeout(logoutTimer);
    };
  }, [checkAuthStatus, logout]);

  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <div className="min-h-screen flex">
          <Sidebar />
          <div className="flex flex-col w-full">
            {/* Header için sola padding ekleyelim */}
            <Header onLogout={logout} />
            <main className="flex-grow p-4 mt-16"> {/* mt-16 ile Header yüksekliği kadar boşluk bırakıyoruz */}
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/manage-packages" element={<QuestionsManagePanel />} />
                <Route path="/interview-list" element={<InterviewManagePanel />} />
                <Route path="/videos/:interviewId" element={<VideoCollection />} />
                <Route path="/interview/:id" element={<InterviewDetail />} /> 
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}

      {/* ToastContainer bileşeni, tüm uygulamada toast bildirimlerinin çalışması için */}
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
    </BrowserRouter>
  );
}

export default App;
