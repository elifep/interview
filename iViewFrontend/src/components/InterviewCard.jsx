import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Toastify import edildi

const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;

function InterviewCard({ interview }) {
    const [applicationCount, setApplicationCount] = useState(0); // Başvuru sayısını tutmak için state

    // Mülakatın başvuru sayısını çekme işlevi
    useEffect(() => {
        const fetchApplicationCount = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/application/interview/${interview._id}/count`);
                
                // `applicationCount` verisini API'den alıyoruz
                setApplicationCount(response.data.applicationCount); // Doğru veri yolunu kullanarak sayıyı set ediyoruz
            } catch (error) {
                toast.error("Başvuru sayısı alınamadı!"); // Başvuru sayısı alınamadığında hata mesajı gösteriliyor
                console.error("Başvuru sayısı alınamadı:", error);
            }
        };

        fetchApplicationCount();
    }, [interview._id]);

    // Mülakatın linkini kopyalama işlevi
    const handleCopyLink = () => {
        if (interview.link) {
            navigator.clipboard.writeText(interview.link); // Tarayıcıda panoya kopyalama işlemi
            toast.success('Başvuru linki kopyalandı!'); // Link kopyalandığında başarı mesajı
        } else {
            toast.warn('Mülakat yayında değil.'); // Mülakat yayında değilse uyarı mesajı
        }
    };

    return (
        <div className="relative p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-teal-700">{interview.title}</h3>
                {interview.link && (
                    <button
                        onClick={handleCopyLink}
                        className="text-gray-400 hover:text-yellow-600 transition-all duration-150"
                    >
                        <i className="fas fa-link"></i> Copy Link
                    </button>
                )}
            </div>

            <div className="bg-teal-50 p-4 rounded-md shadow-inner">
                <p className="text-sm font-medium text-gray-600 mb-2">Candidates: {applicationCount}</p> {/* Doğru sayıyı göster */} 
            </div>

            <div className="flex justify-between items-center mt-4">
                <p className={`text-sm font-medium ${interview.published ? 'text-green-500' : 'text-red-500'}`}>
                    {interview.published ? 'Published' : 'Not Published'}
                </p>
                <Link 
                    to={`/videos/${interview._id}`} 
                    className="text-sm font-medium text-yellow-500 hover:text-yellow-700 transition-all duration-150"
                >
                    See Applications &gt;
                </Link>
            </div>
        </div>
    );
}

// PropTypes tanımlaması
InterviewCard.propTypes = {
    interview: PropTypes.shape({
        title: PropTypes.string.isRequired,
        published: PropTypes.bool.isRequired,
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        link: PropTypes.string,
    }).isRequired,
};

export default InterviewCard;
