import { create } from 'zustand';
import axios from 'axios'; // Axios ile API çağrısı yapacağız

export const useVideoStore = create((set) => ({
  hasPermission: false,
  isRecording: false,
  recordedChunks: [],
  setHasPermission: (permission) => set({ hasPermission: permission }),
  setIsRecording: (isRecording) => set({ isRecording }),
  setRecordedChunks: (chunks) => set({ recordedChunks: chunks }),

  // Kayıt chunk'larını sıfırlama
  resetChunks: () => set({ recordedChunks: [] }),

  uploadToS3: async (interviewId, applicationId) => {
    console.log('Uploading for Interview ID:', interviewId);
    const { recordedChunks } = useVideoStore.getState();
    console.log('Recorded Chunks Before Upload:', recordedChunks); // Add this to verify
    if (recordedChunks.length === 0) {
      console.warn('Yüklenecek video yok');
      return;
    }


    // Create a Blob from the recorded chunks
    const videoBlob = new Blob(recordedChunks, { type: 'video/webm' });
    const formData = new FormData();
    formData.append('video', videoBlob, 'interview_video.webm');
    formData.append('applicationId', applicationId);

    try {
      const response = await axios.post('/api/video/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Video başarıyla yüklendi:', response.data);
      set({ recordedChunks: [] }); // Clear the chunks after successful upload
    } catch (error) {
      console.error('Video yüklenemedi:', error);
    }
  },
}));
