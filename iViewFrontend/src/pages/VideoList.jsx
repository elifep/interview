// import React from 'react';
// import VideoCard from '../components/VideoCard'; // Video kartı bileşenini çağırıyoruz
// import { useVideoStore } from '../stores/videoStore'; // Zustand store'dan veri çekiyoruz

// function VideoList() {
//     const { videos } = useVideoStore(); // Videoları Zustand store'dan çekiyoruz

//     return (
//         <div className="w-full p-6">
//             <h2 className="text-2xl font-semibold mb-6">Backend Interview Video Collection</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {videos.map((video) => (
//                     <VideoCard key={video.id} video={video} />
//                 ))}
//             </div>
//             <div className="flex justify-end mt-6">
//                 <button className="bg-gray-300 px-4 py-2 rounded-md">Save</button>
//             </div>
//         </div>
//     );
// }

// export default VideoList;
