import React from 'react';

function VideoPlayer({ videoUrl }) {
    return (
        <div className="aspect-w-16 aspect-h-9 bg-black">
            <video src={videoUrl} controls className="w-full h-full rounded-md" />
        </div>
    );
}

export default VideoPlayer;
