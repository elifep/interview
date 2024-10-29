
import React, { useEffect, useRef } from 'react';
import { useVideoStore } from '../stores/useVideoStore';

const VideoRecorder = ({ interviewId, candidateId }) => {
  const videoRef = useRef(null);
  const {
    isRecording,
    setIsRecording,
    setRecordedChunks,
    uploadToS3,
    resetChunks,
  } = useVideoStore();

  useEffect(() => {
    const getVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        setIsRecording(false);
      } catch (error) {
        console.error('Kamera erişimi reddedildi', error);
      }
    };
    getVideoStream();
  }, [setIsRecording]);

  const handleRecording = () => {
    if (isRecording) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      setIsRecording(false);
    } else {
      const mediaRecorder = new MediaRecorder(videoRef.current.srcObject);
      let chunks = [];

      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        setRecordedChunks(chunks);
      };

      mediaRecorder.start();
      setIsRecording(true);
    }
  };  

  const handleUpload = () => {
    uploadToS3(interviewId, candidateId);
  };

  // Expose functions to parent component through props
  useEffect(() => {
    if (onStartRecording) onStartRecording(handleStartCaptureClick);
    if (onStopRecording) onStopRecording(handleStopCaptureClick);
  }, [onStartRecording, onStopRecording]);

  return (
    <div>
      <video ref={videoRef} autoPlay muted></video>
      <button onClick={handleRecording}>
        {isRecording ? 'Kaydı Durdur' : 'Kaydı Başlat'}
      </button>
      <button onClick={handleUpload} disabled={recordedChunks.length === 0}>
        Videoyu Yükle
      </button>
      <button onClick={resetChunks}>Chunk'ları Sıfırla</button>
    </div>
  );
};

export default VideoRecorder;
