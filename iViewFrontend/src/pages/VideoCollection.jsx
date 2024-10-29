import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VideoCollection = () => {
  const { interviewId } = useParams(); // URL'den interviewId'yi al
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/application/interview/${interviewId}/applications`);
        console.log("Fetched Applications:", response.data); // Başvuruları kontrol et
    
        if (Array.isArray(response.data)) {
          // Gelen başvuruları state'e kaydet
          setApplications(response.data);
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

  if (loading) return <p>Başvurular yükleniyor...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="application-collection-page">
      <h2 className="text-2xl font-bold mb-4">Başvurular</h2>
      {applications.length === 0 ? (
        <p>Henüz başvuru bulunmuyor.</p>
      ) : (
        <div className="application-list">
          {applications.map((application) => (
            <div key={application._id} className="application-card p-4 bg-gray-100 shadow-md rounded-lg mb-4">
              <h3 className="text-lg font-semibold mb-2">
                Aday: {application.name} {application.surname}
              </h3>
              <p className="text-sm text-gray-600">Email: {application.email}</p>
              <p className="text-sm text-gray-600">Telefon: {application.phoneNumber}</p>
              <p className="text-sm text-gray-600">Durum: <strong>{application.status}</strong></p>
              <p className="text-sm text-gray-600">Başvuru Tarihi: {new Date(application.appliedAt).toLocaleDateString()}</p>

              {application.presignedUrl ? (
                <div className="mt-4">
                  <video controls className="w-full h-auto">
                    <source src={`${application.presignedUrl}`} type="video/mp4" />
                    Tarayıcınız bu video formatını desteklemiyor.
                  </video>
                </div>
              ) : (
                <p className="text-red-500 mt-2">Video bulunamadı.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoCollection;
