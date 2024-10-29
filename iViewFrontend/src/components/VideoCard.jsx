// src/components/VideoCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function VideoCard({ video }) {
    const navigate = useNavigate();

    // Oynat butonuna tıklandığında yönlendirme
    const handlePlayClick = () => {
        navigate(`/interview/${video.id}`); // Videonun olduğu sayfaya yönlendir
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 relative">
            {/* Başvuru durumu */}
            <div className="absolute top-2 right-2">
                <span className={`text-sm ${video.status === 'Onaylandı' ? 'text-green-500' : 'text-red-500'}`}>
                    {video.status}
                </span>
            </div>

            {/* Aday bilgileri */}
            <h3 className="text-lg font-semibold">{video.candidate}</h3>

            {/* Oynat butonu */}
            <div className="flex justify-center items-center mt-4">
                <button onClick={handlePlayClick} className="bg-blue-500 text-white py-2 px-4 rounded-md">
                    Oynat
                </button>
            </div>
        </div>
    );
}

VideoCard.propTypes = {
    video: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        candidate: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
    }).isRequired,
};

export default VideoCard;
