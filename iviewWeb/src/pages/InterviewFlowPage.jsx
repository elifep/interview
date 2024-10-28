import React, { useEffect, useState, useRef } from 'react';
import { useInterviewStore } from '../stores/useInterviewStore';
import { useVideoStore } from '../stores/useVideoStore'; 
import ProgressBar from '../components/ProgressBar';
import Timer from '../components/Timer';
import QuestionPanel from '../components/QuestionPanel';
import VideoRecorder from './VideoRecorder';

const InterviewFlowPage = ({ interview }) => {
  const {
    currentQuestionIndex,
    nextQuestion,
    timeRemaining,
    totalTimeRemaining,
    decrementTime,
    setInterview,
    startCountdown
  } = useInterviewStore();

  const { resetChunks, uploadToS3 } = useVideoStore();

  const [recordingStarted, setRecordingStarted] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const startRecordingRef = useRef(null);
  const stopRecordingRef = useRef(null);

  useEffect(() => {
    if (interview) {
      setInterview(interview);
    }
  }, [interview, setInterview]);

  useEffect(() => {
    let interval;
    if (recordingStarted) {
      interval = setInterval(() => {
        decrementTime();
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [recordingStarted, decrementTime]);

  const handleStart = () => {
    setRecordingStarted(true);
    startCountdown();
    setIsStarted(true);

    // Start the video recording
    if (startRecordingRef.current) startRecordingRef.current();
  };

  const handleDone = () => {
    setRecordingStarted(false);
    resetChunks();
    nextQuestion();

    // Stop the video recording
    if (stopRecordingRef.current) stopRecordingRef.current();

    // Call uploadToS3 function here after stopping the recording
    console.log("Starting video upload process...");
    uploadToS3(interview._id, 'your-application-id');
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds) || seconds < 0) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-teal-50">
      <div className="w-full max-w-7xl mx-auto px-8 pt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-800 font-bold">{interview.title || "Interview Title"}</span>
          <span className="text-gray-700 font-bold">
            Minutes Remaining: {formatTime(totalTimeRemaining)}
          </span>
        </div>
        <ProgressBar progress={(currentQuestionIndex / interview.questions.length) * 100} />
      </div>

      <div className="flex flex-grow w-full max-w-7xl mx-auto bg-teal shadow-lg rounded-lg mt-2 mb-2 p-2 ">
        <div className="flex-1 bg-black relative">
          <VideoRecorder
            onStartRecording={(fn) => (startRecordingRef.current = fn)}
            onStopRecording={(fn) => (stopRecordingRef.current = fn)}
          />
          {!isStarted && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                className="bg-red-600 text-white py-3 px-6 rounded-full hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
                onClick={handleStart}
              >
                Start Recording
              </button>
            </div>
          )}
        </div>

        <div className="w-1/3 p-4 bg-gray-50 flex flex-col justify-start border-l border-gray-300">
          <div className="flex justify-between items-center mb-4">
            <Timer time={timeRemaining} label="Minutes Remaining For Question" />
          </div>

          <div className="mb-4 text-center">
            <h2 className="text-2xl font-bold text-teal-900">Sorular</h2>
          </div>

          <QuestionPanel
            question={interview.questions[currentQuestionIndex]}
            questionIndex={currentQuestionIndex}
            timeRemaining={timeRemaining}
            onSkip={nextQuestion}
            onDone={handleDone}
          />
        </div>
      </div>
    </div>
  );
};

export default InterviewFlowPage;
