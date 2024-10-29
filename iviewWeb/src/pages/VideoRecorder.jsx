import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import { useVideoStore } from '../stores/useVideoStore';

const VideoRecorder = ({ interviewId, candidateId }) => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);

  const {
    hasPermission,
    setHasPermission,
    recordedChunks,
    setRecordedChunks,
    uploadToS3,
    resetChunks,
  } = useVideoStore();

  // Kamera ve mikrofon izni kontrolü
  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (stream) setHasPermission(true);
      } catch (error) {
        setHasPermission(false);
        console.error('Kamera ve mikrofon erişim izni reddedildi:', error);
      }
    };
    checkPermissions();
  }, [setHasPermission]);

  // Kayıt başlatma işlemi
  const handleStartRecording = () => {
    if (!webcamRef.current || !webcamRef.current.stream) {
      console.error('Kamera akışı bulunamadı');
      return;
    }

    setRecording(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: 'video/webm'
    });

    let chunks = [];
    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    mediaRecorderRef.current.onstop = () => {
      setRecordedChunks(chunks); // Kayıt chunk'larını store'a ekliyoruz
      console.log('Kayıt durduruldu, chunk\'lar kaydedildi.');
    };

    mediaRecorderRef.current.start();
    console.log('Kayıt başladı...');
  };

  // Kayıt durdurma işlemi
  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      console.log('Kayıt durduruldu.');
    }
  };

  // Video S3'e yükleme işlemi
  const handleUpload = async () => {
    await uploadToS3(interviewId, candidateId); // ID bilgileri ile S3'e video yüklüyoruz
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-900">
      {hasPermission ? (
        <>
          <Webcam
            audio={true}
            ref={webcamRef}
            mirrored={true}
            videoConstraints={{
              width: 1920,
              height: 1080,
              facingMode: 'user',
            }}
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-8 flex space-x-4">
            <button
              onClick={recording ? handleStopRecording : handleStartRecording}
              className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-700"
            >
              {recording ? 'Kaydı Durdur' : 'Kaydı Başlat'}
            </button>
            <button
              onClick={handleUpload}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              disabled={recordedChunks.length === 0}
            >
              Videoyu Yükle
            </button>
            <button onClick={resetChunks} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
              Chunk'ları Sıfırla
            </button>
          </div>
        </>
      ) : (
        <p className="text-white">Lütfen kamera ve mikrofona izin verin.</p>
      )}
    </div>
  );
};

export default VideoRecorder;