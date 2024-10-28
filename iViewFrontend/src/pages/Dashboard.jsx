import { useEffect } from 'react';
import InterviewCard from '../components/InterviewCard'; // InterviewCard bileşenini çağırıyoruz
import { useInterviewStore } from '../stores/useInterviewStore'; // Veriyi store'dan çekiyoruz

function InterviewList() {
  const { interviews, fetchPublishedInterviews, loading, error } = useInterviewStore(); // Store'dan veriyi ve fonksiyonu çekiyoruz

  useEffect(() => {
    fetchPublishedInterviews(); // Yalnızca aktif mülakatları backend'den çekiyoruz
  }, [fetchPublishedInterviews]);

  if (loading) {
    return <div>Loading interviews...</div>; // Yüklenme durumu
  }

  if (error) {
    return <div>Error: {error}</div>; // Hata durumu
  }

  return (
    <div className="w-full p-6 bg-white min-h-screen"> {/* Arka plan beyaz */}
      <h2 className="text-2xl font-semibold mb-6 text-teal-700">Active Interviews</h2> {/* Başlık */}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Grid yapı */}
        {interviews.map((interview) => (
          <InterviewCard key={interview._id} interview={interview} />
        ))}
      </div>
    </div>
  );
}

export default InterviewList;
