import React, { useEffect } from 'react';
import { useInterviewStore } from '../stores/useInterviewStore';
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
                </div>
            </div>
        </div>
    );
};

export default InterviewFlowPage;
