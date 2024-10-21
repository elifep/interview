// useVideoStore.js

import { create } from 'zustand'; // Zustand'dan create'in doğru import edildiğine dikkat edin

// Eğer birden fazla kez create tanımlanmışsa, burada sorun olabilir.
// Durum yönetimi fonksiyonlarınız aşağıdaki gibi olmalı:
const useVideoStore = create((set) => ({
  hasPermission: false,
  setHasPermission: (value) => set({ hasPermission: value }),
  isRecording: false,
  setIsRecording: (value) => set({ isRecording: value }),
  recordedChunks: [],
  setRecordedChunks: (chunks) => set({ recordedChunks: chunks }),
  resetChunks: () => set({ recordedChunks: [] }),
}));

export default useVideoStore;
