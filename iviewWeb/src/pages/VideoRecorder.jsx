import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { useVideoStore } from '../stores/useVideoStore'; // useVideoStore'u named import olarak içe aktarıyoruz

const VideoRecorder = () => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const {
    hasPermission,
    setHasPermission,
    isRecording,
    setIsRecording,
    recordedChunks,
    setRecordedChunks,
    resetChunks,
  } = useVideoStore();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        setHasPermission(true);
      })
      .catch(error => {
        setHasPermission(false);
        console.error('Camera and microphone permission denied:', error);
      });
  }, [setHasPermission]);

  const handleStartCaptureClick = () => {
    setIsRecording(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: 'video/webm'
    });
    mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
    mediaRecorderRef.current.start();
  };

  const handleDataAvailable = ({ data }) => {
    if (data.size > 0) {
      setRecordedChunks((prev) => [...prev, data]); // Ensure `recordedChunks` is an array
    }
  };

  const handleStopCaptureClick = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  return (
    <div className="flex justify-center items-center w-full h-full bg-gray-900">
      {hasPermission && (
        <div className="relative w-full h-full">
          <Webcam
            audio={true}
            ref={webcamRef}
            mirrored={true}
            videoConstraints={{
              width: 1920,
              height: 1080,
              facingMode: "user"
            }}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default VideoRecorder;
