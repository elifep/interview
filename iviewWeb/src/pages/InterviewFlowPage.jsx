import React, { useEffect } from 'react';
import { useInterviewStore } from '../stores/useInterviewStore';
import VideoPlayer from '../components/VideoPlayer'; // Ensure this is your video component
import ProgressBar from '../components/ProgressBar';
import Timer from '../components/Timer';
import QuestionPanel from '../components/QuestionPanel'; // Your existing QuestionPanel component

const InterviewFlowPage = ({ interview }) => {
    const { currentQuestionIndex, skipQuestion, completeQuestion, timeRemaining } = useInterviewStore();
    console.log(interview); // interview nesnesinin gelip gelmediğini kontrol edin
    if (interview?.questions?.length > 0) {
        console.log('Sorular yüklendi:', interview.questions);
    } else {
        console.log('Sorular yüklenemedi');
    }
    useEffect(() => {
        if (interview && interview.questions?.length > 0) {
            console.log('Sorular mevcut, işlem devam ediyor.');
        } else {
            console.log('Sorular henüz yüklenmedi.');
        }
    }, [interview]);
    // Mock the current question text for now
    const currentQuestion = interview?.questions?.[currentQuestionIndex] || 'No question available';
    console.log('Current Question Index:', currentQuestionIndex);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    {/* Top Breadcrumb and Progress Bar */}
    <div className="w-full px-8 pt-4">
        <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">{interview.title || "Interview Title"}</span>
        </div>
        <ProgressBar progress={80} />
    </div>

    {/* Main Interview Area */}
    <div className="flex flex-grow w-full max-w-full bg-white shadow-lg rounded-lg overflow-hidden mt-2 mb-2 p-4"> {/* Sağ, sol, üst, alt 10px padding ekledik */}
        
        {/* Video Section (70% width) */}
        <div className="flex-1 bg-gray-900 flex items-center justify-center relative">
            <VideoPlayer className="w-full h-full" />
            {/* <div className="absolute bottom-4 right-4 text-white bg-black bg-opacity-50 px-3 py-1 rounded">
                Recording in progress...
            </div> */}
        </div>

        {/* Question Panel Section (30% width) */}
        <div className="w-1/3 p-6 bg-white flex flex-col justify-between border-l border-gray-300">
            
            {/* Question Text and Timer */}
            <div className="flex flex-col h-full justify-between">
                <div className="flex justify-between items-center mb-4">
                    <Timer time={timeRemaining || 120} label="Question" />
                    <Timer time={interview.totalDuration || 960} label="Total" />
                </div>

                <QuestionPanel
                    question={currentQuestion}
                    timeRemaining={timeRemaining}
                    onSkip={skipQuestion}
                    onDone={completeQuestion}
                />
            </div>
        </div>
    </div>
</div>

    );
};

export default InterviewFlowPage;
