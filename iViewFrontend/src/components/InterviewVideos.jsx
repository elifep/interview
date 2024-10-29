// // src/pages/InterviewVideos.jsx
// import React from 'react';
// import { useParams } from 'react-router-dom';
// import VideoCard from '../components/VideoCard';

// function InterviewVideos() {
//     const { id } = useParams(); // Yönlendirilen mülakatın ID'sini alıyoruz

//     const videos = [
//         { id: 1, candidate: "Abdulkadir Katıaş", videoUrl: "https://video-url1", status: "Onaylandı" },
//         { id: 2, candidate: "Yıldız Azizi", videoUrl: "https://video-url2", status: "Beklemede" },
//         // ... Diğer videolar
//     ];

//     return (
//         <div className="w-full p-6">
//             <h2 className="text-2xl font-semibold mb-6">Mülakat Videoları</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {videos.map((video) => (
//                     <VideoCard key={video.id} video={video} />
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default InterviewVideos;
