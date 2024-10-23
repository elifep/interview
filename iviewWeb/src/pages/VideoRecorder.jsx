import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import useVideoStore from '../stores/useVideoStore'; // Zustand store'unuzu import edin.
import axios from 'axios';

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
    // Kaydı tamamla ve ardından videoyu yükle
    uploadVideo();
  };
  
  const uploadVideo = async () => {
    if (recordedChunks.length > 0) {
      const blob = new Blob(recordedChunks, { type: 'video/webm' }); // Yüklemek için video dosyasını blob olarak oluştur
      const formData = new FormData();
      
      formData.append('video', blob, 'recordedVideo.mp4'); // Blob'u form data'ya ekle
      formData.append('candidateId', '12345'); // Örnek olarak bir candidateId ekliyoruz (dinamik yapabilirsiniz)
      formData.append('interviewId', 'interview_01'); // Örnek olarak bir interviewId ekliyoruz (dinamik yapabilirsiniz)
  
      try {
        const response = await axios.post('/api/video/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Video başarıyla yüklendi:', response.data.videoUrl);
        // Burada video URL'sini state'e veya bir yere kaydedebilirsiniz, böylece videoyu izleyebilirsiniz.
        resetChunks(); // Video yüklemesi tamamlandığında chunk'ları sıfırla
      } catch (error) {
        console.error('Video yüklenemedi:', error);
      }
    } else {
      console.warn('Yüklenecek video yok');
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full bg-gray-900">
      {hasPermission && (
        <div className="relative w-full h-full">
          <Webcam
            audio={true}
            ref={webcamRef}
            videoConstraints={{
              width: 1920,
              height: 1080,
              facingMode: "user"
            }}
            className="w-full h-full object-cover"
          />
          
          {isRecording ? (
            <button 
              onClick={handleStopCaptureClick} 
              className="absolute bottom-4 left-4 bg-red-500 text-white py-2 px-4 rounded"
            >
              Stop Capture
            </button>
          ) : (
            <button 
              onClick={handleStartCaptureClick} 
              className="absolute bottom-4 left-4 bg-blue-500 text-white py-2 px-4 rounded"
            >
              Start Capture
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoRecorder;
