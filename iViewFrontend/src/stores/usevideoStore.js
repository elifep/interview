import { create } from 'zustand';
import axios from 'axios';

export const useVideoStore = create((set) => ({
  videos: [],
  fetchVideos: async (interviewId) => {
    try {
      const response = await axios.get(`/api/interview/${interviewId}/applications`);
      if (Array.isArray(response.data)) {
        // Set only applications with a video URL
        set({ videos: response.data.filter(app => app.videoUrl) });
      } else {
        console.error("Expected an array:", response.data);
        set({ videos: [] });
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  },
}));

// import { create } from 'zustand';

// export const useVideoStore = create((set) => ({
//     // videos: [
//     //     { id: 1, candidate: 'Abdulkadir Kattaş', status: 'Approved', videoUrl: '/videos/1.mp4', packageId: 1 },
//     //     { id: 2, candidate: 'Yıldız Azizi', status: 'Pending', videoUrl: '/videos/2.mp4', packageId: 1 },
//     //     { id: 3, candidate: 'Ahat Demirezen', status: 'Approved', videoUrl: '/videos/3.mp4', packageId: 2 },
//     //     { id: 4, candidate: 'Murat Efe Çetin', status: 'Pending', videoUrl: '/videos/4.mp4', packageId: 2 },
//     //     { id: 5, candidate: 'Taha Zeytun', status: 'Approved', videoUrl: '/videos/5.mp4', packageId: 3 },
//     //     { id: 6, candidate: 'Seda Müritsoy', status: 'Pending', videoUrl: '/videos/6.mp4', packageId: 3 },
//     //     { id: 7, candidate: 'Seda Müritsoy', status: 'Pending', videoUrl: '/videos/7.mp4', packageId: 3 },
//     //     { id: 8, candidate: 'Elif Ep', status: 'Pending', videoUrl: '/videos/8.mp4', packageId: 8 },
//     // ],

//     fetchVideos: async () => {
//         // API call to fetch videos (if necessary)
//             try {
//               const response = await axios.get(`/api/video/interview/${interviewId}`);
//               console.log("Gelen Videolar:", response.data); // Konsolda veriyi kontrol edin
//               if (Array.isArray(response.data)) { // Gelen verinin dizi olduğunu kontrol edin
//                 setVideos(response.data);
//               } else {
//                 console.error("Beklenen dizi alınamadı:", response.data);
//                 setVideos([]); // Hatalı durumda boş bir diziye set edebilirsiniz
//               }
//             } catch (err) {
//               setError('Videolar yüklenirken bir hata oluştu');
//               setVideos([]); // Hatalı durumda boş bir diziye set edebilirsiniz
//               setLoading(false);
//             }
   
//     },
// }));
