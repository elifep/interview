import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { useVideoStore } from '../stores/useVideoStore';

const VideoRecorder = ({ onStartRecording, onStopRecording }) => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const {
    hasPermission,
    setHasPermission,
    setIsRecording,
    setRecordedChunks,
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
    if (!webcamRef.current) {
      console.error('Webcam reference is not set');
      return;
    }

    setIsRecording(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: 'video/webm'
    });
    
    mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
    mediaRecorderRef.current.start();
    console.log('Recording started...');
  };

  const handleDataAvailable = ({ data }) => {
    if (data.size > 0) {
      console.log('Data available:', data);
      setRecordedChunks((prev) => [...prev, data]);
    } else {
      console.warn('No data available in recording chunk');
    }
  };  

  const handleStopCaptureClick = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      console.log('Recording stopped.');
      setIsRecording(false);
    } else {
      console.error('No media recorder found.');
    }
  };

  // Expose functions to parent component through props
  useEffect(() => {
    if (onStartRecording) onStartRecording(handleStartCaptureClick);
    if (onStopRecording) onStopRecording(handleStopCaptureClick);
  }, [onStartRecording, onStopRecording]);

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
