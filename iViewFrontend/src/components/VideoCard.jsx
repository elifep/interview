import React from 'react';
import { useNavigate } from 'react-router-dom'; // Yönlendirme için hook

function VideoCard({ video }) {
    const navigate = useNavigate(); // Yönlendirme işlemi

    // Video oynatma sayfasına yönlendirme
    const handlePlayClick = () => {
        navigate(`/interview/${video.id}`); // İlgili video sayfasına yönlendirme
    };

    return (
        <div className="p-8 bg-white rounded-lg shadow-md border border-gray-300 relative">
            {/* Durum gösterimi */}
            <div className="absolute top-2 right-2 flex space-x-2">
                <span className={`text-sm ${video.status === 'Approved' ? 'text-green-500' : 'text-red-500'}`}>
                    {video.status}
                </span>
            </div>

            {/* Aday adı */}
            <h3 className="text-lg font-semibold">{video.candidate}</h3>

            {/* Oynat butonu */}
            <div className="flex justify-center items-center mt-4">
                <button onClick={handlePlayClick}>
                    <i className="fas fa-play fa-3x text-blue-500"></i> {/* Oynat ikonu */}
                </button>
            </div>
        </div>
    );
}

export default VideoCard;
