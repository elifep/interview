import React, { useEffect, useState } from 'react';
import { useInterviewStore } from '../stores/useInterviewStore';
<<<<<<< HEAD
import VideoPlayer from '../components/VideoPlayer'; 
import ProgressBar from '../components/ProgressBar';
import Timer from '../components/Timer';
import QuestionPanel from '../components/QuestionPanel'; 

const InterviewFlowPage = () => {
    const { interview, currentQuestionIndex, skipQuestion, completeQuestion, timeRemaining, fetchInterview } = useInterviewStore();

    // Soruları ve interview bilgisini store'dan çek
    useEffect(() => {
        if (!interview) {
            const uniqueId = getUniqueIdFromURL(); // URL'den uniqueId'yi alın
            fetchInterview(uniqueId);
        }
    }, [interview, fetchInterview]);

    // Soruların dolu olup olmadığını kontrol et
    if (!interview) {
        return <p>Loading interview...</p>;
    }

    if (!interview.questions || interview.questions.length === 0) {
        return <p>No questions found for this interview.</p>;
    }

    const currentQuestion = interview.questions[currentQuestionIndex] || 'No question available';

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            {/* Top Breadcrumb and Progress Bar */}
            <div className="w-full px-8 pt-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">{interview.title || "Interview Title"}</span>
                </div>
                <ProgressBar progress={(currentQuestionIndex + 1) / interview.questions.length * 100} />
            </div>

            {/* Main Interview Area */}
            <div className="flex flex-grow w-full max-w-full bg-white shadow-lg rounded-lg overflow-hidden mt-2 mb-2 p-4"> 
                
                {/* Video Section (70% width) */}
                <div className="flex-1 bg-gray-900 flex items-center justify-center relative">
                    <VideoPlayer className="w-full h-full" />
                </div>

                {/* Question Panel Section (30% width) */}
                <div className="w-1/3 p-6 bg-white flex flex-col justify-between border-l border-gray-300">
                    <div className="flex flex-col h-full justify-between">
                        <div className="flex justify-between items-center mb-4">
                            <Timer time={timeRemaining || currentQuestion.timeLimit || 120} label="Question" />
                            <Timer time={interview.totalDuration || 960} label="Total" />
                        </div>

                        <QuestionPanel
                            question={currentQuestion.questionText || "No question available"}
                            timeRemaining={timeRemaining}
                            onSkip={skipQuestion}
                            onDone={completeQuestion}
                        />
                    </div>
=======
import VideoPlayer from '../components/VideoPlayer';
import ProgressBar from '../components/ProgressBar';
import Timer from '../components/Timer';
import QuestionPanel from '../components/QuestionPanel';

const InterviewFlowPage = ({ interview }) => {
    const { 
        currentQuestionIndex, 
        nextQuestion, 
        timeRemaining, 
        totalTimeRemaining, 
        decrementTime,
        setInterview 
    } = useInterviewStore();

    const [recordingStarted, setRecordingStarted] = useState(false);

    // Set up the interview data when the component mounts
    useEffect(() => {
        if (interview) {
            console.log('Gelen mülakat:', interview);
            setInterview(interview); // Initialize interview data
        } else {
            console.log('Mülakat yüklenmedi');
        }
    }, [interview, setInterview]);

    // Handle the countdown timer when recording starts
    useEffect(() => {
        let interval;
        if (recordingStarted) {
            // Start the interval if recording has started
            interval = setInterval(() => {
              console.log("Interval running"); // Log to confirm the interval is running
              decrementTime(); // Call the decrement function from Zustand
            }, 1000);
          }
  // Cleanup function to clear the interval when the component unmounts or recording stops
  return () => {
    if (interval) {
      clearInterval(interval);
    }
  };
}, [recordingStarted, decrementTime]);

    // Function to start the recording
    const startRecording = () => {
        setRecordingStarted(true); // Set the state to start recording
    };

    // Format time in seconds to MM:SS format
    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds) || seconds < 0) return "00:00";
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="w-full px-8 pt-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">{interview.title || "Interview Title"}</span>
                    <span className="text-gray-600">
                        Total Duration: {formatTime(totalTimeRemaining)}
                    </span>
                </div>
                <ProgressBar progress={(currentQuestionIndex / interview.questions.length) * 100} />
            </div>

            <div className="flex flex-grow w-full max-w-full bg-white shadow-lg rounded-lg overflow-hidden mt-2 mb-2 p-4">
                <div className="flex-1 bg-gray-900 flex items-center justify-center relative">
                    <VideoPlayer onStartRecording={startRecording} />
                </div>

                <div className="w-1/3 p-6 bg-white flex flex-col justify-between border-l border-gray-300">
                    <div className="flex justify-between items-center mb-4">
                        <Timer time={timeRemaining} label="Minutes Remaining" />
                    </div>

                    <QuestionPanel
                        question={interview.questions[currentQuestionIndex]}
                        timeRemaining={timeRemaining}
                        onSkip={nextQuestion}
                        onDone={nextQuestion}
                    />
>>>>>>> 4a2f93eeaa170cc07469b40b7994db797303e4a9
                </div>
            </div>
        </div>
    );
};

export default InterviewFlowPage;
