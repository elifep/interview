import React from 'react';
import Timer from './Timer';

const QuestionPanel = ({ question, timeRemaining, onSkip, onDone, questionIndex }) => {
    return (
        <div className="flex flex-col h-full justify-between">
            {/* Soru Başlığı ve Detayları */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-teal-900 mb-2">Soru {questionIndex + 1}: {question?.questionText || "No question available"}</h3> {/* Soru numarası dinamik olarak eklendi */}
                {/* <h3 className="text-lg font-semibold text-teal-800"></h3> */}
                {/* <p className="text-sm text-gray-500">
                    Duration: {question?.timeLimit || 0} minutes
                </p> */}
            </div>

            {/* Bilgilendirme ve Uyarı Metinleri */}
            <div className=" flex flex-col mt-4 mb-4">
                <p className="text-red-600 text-sm leading-relaxed font-medium bg-red-100 p-1 rounded">
                    Mülakat sırasında çıkış yaparsanız tekrar giremezsiniz.
                </p>
           

            {/* Geç ve Tamamla Butonları */}
            <div className="flex justify-between mt-8">
                <button
                    className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                    onClick={onSkip}
                >
                    Skip
                </button>
                <button
                    className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-900"
                    onClick={onDone}
                >
                    Done
                </button>
            </div>
             </div>
        </div>
    );
};

export default QuestionPanel;
