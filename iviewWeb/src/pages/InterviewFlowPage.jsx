import React, { useEffect, useState } from 'react';
import { useInterviewStore } from '../stores/useInterviewStore';
import { useVideoStore } from '../stores/useVideoStore'; // useVideoStore'u içe aktarıyoruz
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

    const { resetChunks } = useVideoStore(); // Kullanılacak store fonksiyonları

    const [recordingStarted, setRecordingStarted] = useState(false);

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

    const startRecording = () => {
        setRecordingStarted(true);
    };

    const handleDone = () => {
        console.log("Video yükleme işlemi şimdilik aktif değil."); // Yükleme işlemi yerine bilgi mesajı ekliyoruz
        resetChunks(); // Kayıt chunk'larını sıfırla
        nextQuestion(); // Sonraki soruya geçiş
    };

    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds) || seconds < 0) return "00:00";
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }; 
//
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-teal-50">
            <div className="w-full max-w-7xl mx-auto px-8 pt-4"> {/* w-full ve max genişlik ile sınırladık */}
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
                    <VideoPlayer onStartRecording={startRecording} />
                    {/* <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded">
                        Kayıt Başladı
                    </div> */}
                </div>

                <div className="w-1/3 p-4 bg-gray-50 flex flex-col justify-start border-l border-gray-300">
                    <div className="flex justify-between items-center mb-4">
                        <Timer time={timeRemaining} label="Minutes Remaining For Question" />
                    </div>

                    {/* Sorular Başlığı (ortalanmış ve büyük) */}
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
