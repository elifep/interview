import React, { useEffect } from 'react';
import { useInterviewStore } from '../stores/useInterviewStore';
import VideoPlayer from '../components/VideoPlayer';
import ProgressBar from '../components/ProgressBar';
import Timer from '../components/Timer';
import QuestionPanel from '../components/QuestionPanel';

const InterviewFlowPage = ({ interview }) => {
    const { 
        currentQuestionIndex, 
        setCurrentQuestionIndex, 
        skipQuestion, 
        completeQuestion, 
        timeRemaining 
    } = useInterviewStore();

    // Gelen mülakatı görmek için useEffect içinde console.log kullanıyoruz
    useEffect(() => {
        if (interview) {
            console.log('Gelen mülakat:', interview); // Interview objesini burada görebilirsiniz
        } else {
            console.log('Mülakat yüklenmedi');
        }
    }, [interview]);

    const currentQuestion = interview?.questions?.[currentQuestionIndex] || 'No question available';

    const handleSkip = () => {
        if (currentQuestionIndex < interview.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleDone = () => {
        completeQuestion();
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            {/* Üst Kısım ve Progress Bar */}
            <div className="w-full px-8 pt-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">{interview.title || "Interview Title"}</span>
                </div>
                <ProgressBar progress={(currentQuestionIndex / interview.questions.length) * 100} />
            </div>

            {/* Ana Mülakat Alanı */}
            <div className="flex flex-grow w-full max-w-full bg-white shadow-lg rounded-lg overflow-hidden mt-2 mb-2 p-4">
                
                {/* Video Bölümü (70% genişlik) */}
                <div className="flex-1 bg-gray-900 flex items-center justify-center relative">
                    <VideoPlayer className="w-full h-full" />
                </div>

                {/* Soru Paneli Bölümü (30% genişlik) */}
                <div className="w-1/3 p-6 bg-white flex flex-col justify-between border-l border-gray-300">
                    {/* Soru ve Zamanlayıcı */}
                    <div className="flex justify-between items-center mb-4">
                        <Timer time={timeRemaining || 120} label="Question" />
                        <Timer time={interview.totalDuration || 960} label="Total" />
                    </div>

                    <QuestionPanel
                        question={currentQuestion}
                        timeRemaining={timeRemaining}
                        onSkip={handleSkip}
                        onDone={handleDone}
                    />
                </div>
            </div>
        </div>
    );
};

export default InterviewFlowPage;
