import { create } from 'zustand';

export const useVideoStore = create((set) => ({
    videos: [
        { id: 1, candidate: 'Abdulkadir Kattaş', status: 'Approved', videoUrl: '/videos/1.mp4', packageId: 1 },
        { id: 2, candidate: 'Yıldız Azizi', status: 'Pending', videoUrl: '/videos/2.mp4', packageId: 1 },
        { id: 3, candidate: 'Ahat Demirezen', status: 'Approved', videoUrl: '/videos/3.mp4', packageId: 2 },
        { id: 4, candidate: 'Murat Efe Çetin', status: 'Pending', videoUrl: '/videos/4.mp4', packageId: 2 },
        { id: 5, candidate: 'Taha Zeytun', status: 'Approved', videoUrl: '/videos/5.mp4', packageId: 3 },
        { id: 6, candidate: 'Seda Müritsoy', status: 'Pending', videoUrl: '/videos/6.mp4', packageId: 3 },
        { id: 7, candidate: 'Seda Müritsoy', status: 'Pending', videoUrl: '/videos/7.mp4', packageId: 3 },
        { id: 8, candidate: 'Elif Ep', status: 'Pending', videoUrl: '/videos/8.mp4', packageId: 8 },
    ],

    fetchVideos: async () => {
        // API call to fetch videos (if necessary)
    },
}));
