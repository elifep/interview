import { create } from 'zustand'; // Doğrudan named import ile 'create' fonksiyonunu içe aktarın
// import axios from 'axios'; // Henüz kullanılmadığı için yorum satırında

export const useVideoStore = create((set) => ({
  hasPermission: false,
  isRecording: false,
  recordedChunks: [],
  setHasPermission: (permission) => set({ hasPermission: permission }),
  setIsRecording: (isRecording) => set({ isRecording }),
  setRecordedChunks: (chunks) => set({ recordedChunks: chunks }),

  // Kayıt chunk'larını sıfırlama
  resetChunks: () => set({ recordedChunks: [] }),

  // S3 API'sine video yükleme (Şimdilik yoruma aldık)
  /*
  uploadToS3: async (interviewId, candidateId) => {
    const { recordedChunks } = useVideoStore.getState();
    if (recordedChunks.length === 0) {
      console.warn('Yüklenecek video yok');
      return;
    }

    // Blob oluştur
    const videoBlob = new Blob(recordedChunks, { type: 'video/webm' });
    const formData = new FormData();
    formData.append('video', videoBlob, 'interview_video.webm');
    formData.append('interviewId', interviewId);
    formData.append('candidateId', candidateId);

    try {
      // S3'e yükleme için API çağrısı (API URL'yi ve başlıkları uygun şekilde düzenleyin)
      const response = await axios.post('https://your-s3-api-endpoint/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Video başarıyla yüklendi:', response.data);
      set({ recordedChunks: [] }); // Yükleme sonrası chunk'ları sıfırla
    } catch (error) {
      console.error('Video yüklenemedi:', error);
    }
  }
  */
}));