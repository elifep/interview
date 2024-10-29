import { create } from 'zustand';
import axios from 'axios';

export const useVideoStore = create((set) => ({
  videos: [], // Videoları saklayacak dizi
  fetchVideos: async (interviewId) => {
    try {
      const response = await axios.get(`/api/interview/${interviewId}/applications`);
      
      // Gelen veri bir array ise işleme al
      if (Array.isArray(response.data)) {
        const videoApplications = response.data.filter(app => app.videoUrl); // Sadece video URL'si olanları filtrele
        
        // Her video URL için presigned URL oluşturma isteği yapabiliriz
        const videoPromises = videoApplications.map(async (app) => {
          try {
            const videoResponse = await axios.get(`/api/video/${app.videoUrl}/presigned-url`);
            return {
              ...app,
              presignedUrl: videoResponse.data.presignedUrl // Presigned URL'yi alıp objeye ekliyoruz
            };
          } catch (videoError) {
            console.error(`Video URL alınamadı: ${app.videoUrl}`, videoError);
            return null; // Hata olursa null dön
          }
        });

        // Tüm videoları bekliyoruz
        const videos = await Promise.all(videoPromises);

        // Hatalı olanlar null olacağı için filtreliyoruz
        set({ videos: videos.filter(video => video !== null) });
      } else {
        console.error("Veri bir dizi değil:", response.data);
        set({ videos: [] });
      }
    } catch (error) {
      console.error("Başvurular getirilirken hata oluştu:", error);
      set({ videos: [] });
    }
  },
}));
