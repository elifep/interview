import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import VideoPlayer from '../components/VideoPlayer'; // VideoPlayer bileşeni
import { toast } from 'react-toastify'; // Toastify import ediyoruz
import 'react-toastify/dist/ReactToastify.css'; // Toastify CSS'i import ediyoruz

const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;

const VideoCollection = () => {
  const { interviewId } = useParams(); // URL'den interviewId'yi al
  const [applications, setApplications] = useState([]); // Başvuruları saklayan state
  const [loading, setLoading] = useState(true); // Yükleme durumu
  const [error, setError] = useState(null); // Hata durumu
  const [filter, setFilter] = useState(''); // Filtre durumu
  const [adminNotes, setAdminNotes] = useState({}); // Admin notlarını saklayan state

  // Başvuruları API'den çekme
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/application/interview/${interviewId}/applications`);
        console.log("Fetched Applications:", response.data); // Başvuruları kontrol et
    
        if (Array.isArray(response.data)) {
          setApplications(response.data); // Başvurular state'e kaydediliyor
        } else {
          console.error("Array bekleniyor fakat farklı bir veri alındı:", response.data);
          setApplications([]); // Hata durumunda boş array set et
        }
        setLoading(false);
      } catch (err) {
        setError('Başvurular çekilirken bir hata oluştu');
        setApplications([]);
        setLoading(false);
      }
    };
    
    fetchApplications();
  }, [interviewId]);

  // Admin notunu güncelleme
  const handleAdminNoteChange = (applicationId, note) => {
    setAdminNotes(prev => ({
      ...prev,
      [applicationId]: note, // İlgili başvuruya göre admin notunu saklıyoruz
    }));
  };

  // Başvuruyu güncelleme işlevi (Onayla veya Reddet)
  const handleUpdateStatus = async (applicationId, status) => {
    try {
      const adminNote = adminNotes[applicationId] || ''; // Admin notu alınıyor, eğer yoksa boş string
      await axios.put(`${BASE_URL}/api/application/${applicationId}/update-status`, {
        status,
        adminNote,
      });
      toast.success(`Başvuru ${status === 'Onaylandı' ? 'onaylandı' : 'reddedildi'}.`); // Başarı mesajı

      // Başvurunun durumu güncellendikten sonra başvuruları tekrar çekiyoruz
      setApplications(prev =>
        prev.map(app =>
          app._id === applicationId ? { ...app, status, adminNote } : app
        )
      );
    } catch (error) {
      toast.error(`Başvuru ${status === 'Onaylandı' ? 'onaylanırken' : 'reddedilirken'} bir hata oluştu.`); // Hata mesajı
      console.error(`Başvuru ${status === 'Onaylandı' ? 'onaylanırken' : 'reddedilirken'} hata oluştu:`, error);
    }
  };

  // Filtrelenmiş başvuruları döndürme
  const filteredApplications = applications.filter(application => {
    if (!filter) return true; // Eğer filtre seçilmemişse tüm başvuruları göster
    return application.status === filter;
  });

  if (loading) return <p>Başvurular yükleniyor...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="application-collection-page p-6">
      <h2 className="text-2xl font-bold mb-4">Mülakat Başvuruları</h2>

      {/* Filtreleme menüsü */}
      <div className="mb-4">
        <label htmlFor="statusFilter" className="mr-2 text-lg font-medium">Başvuru Durumu Filtrele:</label>
        <select
          id="statusFilter"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Tüm Başvurular</option>
          <option value="Beklemede">Beklemede</option>
          <option value="Onaylandı">Onaylandı</option>
          <option value="Reddedildi">Reddedildi</option>
        </select>
      </div>

      {filteredApplications.length === 0 ? (
        <p>Bu kriterlere uygun başvuru bulunmuyor.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Her bir başvuru kartı ve videosu */}
          {filteredApplications.map(application => (
            <div key={application._id} className="application-card p-4 bg-gray-100 shadow-md rounded-lg mb-4">
              <h3 className="text-lg font-semibold mb-2">
                Aday: {application.name} {application.surname}
              </h3>
              <p className="text-sm text-gray-600">Email: {application.email}</p>
              <p className="text-sm text-gray-600">Telefon: {application.phoneNumber}</p>
              <p className="text-sm text-gray-600">Durum: <strong>{application.status}</strong></p>
              <p className="text-sm text-gray-600">Başvuru Tarihi: {new Date(application.appliedAt).toLocaleDateString()}</p>

              {/* AI Skorunu gösteren Progress Bar */}
              {application.aiScore !== undefined && (
                <div className="mt-4">
                  <label className="text-sm font-medium text-gray-600">AI Skoru:</label>
                  <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                    <div
                      className="bg-teal-500 h-4 rounded-full"
                      style={{ width: `${application.aiScore}%` }}
                    ></div>
                  </div>
                  <p className="text-sm font-medium text-gray-700 mt-1">{application.aiScore}%</p>
                </div>
              )}

              {/* Admin Notu Girişi */}
              <div className="mt-4">
                <label htmlFor={`adminNote-${application._id}`} className="text-sm text-gray-600 font-medium">IK Note:</label>
                <textarea
                  id={`adminNote-${application._id}`}
                  value={adminNotes[application._id] || application.adminNote || ''}
                  onChange={e => handleAdminNoteChange(application._id, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-2"
                />
              </div>

              {/* Eğer video mevcutsa VideoPlayer bileşeni gösterilecek */}
              {application.presignedUrl ? (
                <div className="mt-4">
                  <VideoPlayer videoUrl={application.presignedUrl} />
                </div>
              ) : (
                <p className="text-red-500 mt-2">Video bulunamadı.</p>
              )}

              {/* Başvuru Onayla ve Reddet Butonları */}
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleUpdateStatus(application._id, 'Onaylandı')}
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-all"
                >
                  Onayla
                </button>
                <button
                  onClick={() => handleUpdateStatus(application._id, 'Reddedildi')}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-all"
                >
                  Reddet
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoCollection;
