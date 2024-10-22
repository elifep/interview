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

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated); 
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus); 
  const logout = useAuthStore((state) => state.logout);

  // Oturum süresi kontrolü için
  const SESSION_TIMEOUT = 60 * 60 * 1000; // 1 saat (milisaniye cinsinden)

  useEffect(() => {
    checkAuthStatus();
//
    let logoutTimer;

    // Kullanıcı hareketsizse oturumu kapat
    const resetLogoutTimer = () => {
      if (logoutTimer) clearTimeout(logoutTimer);
      logoutTimer = setTimeout(() => {
        alert("Oturumunuz zaman aşımına uğradı, lütfen tekrar giriş yapın.");
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
            <Header onLogout={logout} />
            <main className="p-4">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/manage-packages" element={<QuestionsManagePanel />} />
                <Route path="/interview-list" element={<InterviewManagePanel />} />
                <Route path="/video-collection/:id" element={<VideoCollection />} />
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
    </BrowserRouter>
  );
}

export default App;
