import React from 'react';
import PropTypes from 'prop-types';

function VideoPlayer({ videoUrl }) {
    return (
        <div className="w-full bg-black rounded-lg overflow-hidden">
            <video src={videoUrl} controls className="w-full h-full" />
        </div>
    );
}

VideoPlayer.propTypes = {
    videoUrl: PropTypes.string.isRequired,
};

export default VideoPlayer;
