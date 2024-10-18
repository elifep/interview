import React from 'react';
import { useParams } from 'react-router-dom';

function InterviewVideos() {
    const { id } = useParams(); // Yönlendirilen mülakatın ID'sini alıyoruz

    const videos = [
        { id: 1, name: "Abdulkadir Katıaş", videoUrl: "https://video-url1" },
        { id: 2, name: "Yıldız Azizi", videoUrl: "https://video-url2" },
        { id: 3, name: "Ahmet Demirezen", videoUrl: "https://video-url3" },
        { id: 4, name: "Murat Efe Çetin", videoUrl: "https://video-url4" },
        { id: 5, name: "Taha Zeytun", videoUrl: "https://video-url5" },
        { id: 6, name: "Seda Müritsoy", videoUrl: "https://video-url6" },
    ];

    return (
        <div className="w-full p-6">
            <h2 className="text-2xl font-semibold mb-6">Backend Interview Video Collection</h2>
            <div className="grid grid-cols-3 gap-4">
                {videos.map((video) => (
                    <div key={video.id} className="p-4 bg-white rounded-lg shadow-md border border-gray-300">
                        <h3 className="text-lg font-semibold">{video.name}</h3>
                        <div className="bg-gray-200 p-4 mt-2">
                            <iframe
                                src={video.videoUrl}
                                title={video.name}
                                className="w-full h-40"
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default InterviewVideos;
