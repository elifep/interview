// useVideoStore.js
import { create } from 'zustand'; // Zustand'dan create'in doğru import edildiğine dikkat edin

// Durum yönetimi fonksiyonları
const useVideoStore = create((set) => ({
  hasPermission: false,
  setHasPermission: (value) => set({ hasPermission: value }),
  isRecording: false,
  setIsRecording: (value) => set({ isRecording: value }),
  recordedChunks: [],
  setRecordedChunks: (chunks) => set((state) => ({
    recordedChunks: [...state.recordedChunks, ...chunks] // Mevcut chunks'a yenilerini ekliyoruz
  })),
  resetChunks: () => set({ recordedChunks: [] }), // Chunks'ları sıfırlamak için
}));

export default useVideoStore;
