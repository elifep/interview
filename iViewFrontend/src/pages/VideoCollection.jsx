import React from 'react';
import { useParams } from 'react-router-dom';
import { useVideoStore } from '../stores/videoStore';
import VideoCard from '../components/VideoCard';

function VideoCollection() {
    const { id } = useParams(); // Get the package id from the URL
    const { videos } = useVideoStore(); // Fetch videos from the store
    const filteredVideos = videos.filter((video) => video.packageId === parseInt(id));

    return (
        <div className="w-full p-6">
            <h2 className="text-2xl font-semibold mb-6"> Video Collection</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
        </div>
    );
}

export default VideoCollection;
