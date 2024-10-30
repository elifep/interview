import { useEffect } from 'react';
import InterviewCard from '../components/InterviewCard'; // InterviewCard bileşenini çağırıyoruz
import { useInterviewStore } from '../stores/useInterviewStore'; // Veriyi store'dan çekiyoruz

function InterviewList() {
  const { interviews, fetchPublishedInterviews, loading, error } = useInterviewStore(); // Store'dan veriyi ve fonksiyonu çekiyoruz

  useEffect(() => {
    fetchPublishedInterviews(); // Yalnızca aktif mülakatları backend'den çekiyoruz
  }, [fetchPublishedInterviews]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-teal-600">
          Loading interviews...
        </div>
      </div>
    ); // Yüklenme durumu
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 font-semibold">
          Error: {error} — Please try again later.
        </div>
      </div>
    ); // Hata durumu
  }

  return (
    <div className="w-full p-6 bg-gray-100 min-h-screen"> {/* Arka plan beyaz */}
      <h2 className="text-3xl font-bold mb-8 text-teal-700">Active Interviews</h2> {/* Başlık */}
      
      {interviews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Grid yapı */}
          {interviews.map((interview) => (
            <InterviewCard key={interview._id} interview={interview} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center mt-10">
          <p className="text-lg text-gray-500">No active interviews available.</p>
        </div>
      )}
    </div>
  );
}

export default InterviewList;
