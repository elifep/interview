import React from 'react';

function AddButton({ onClick}) {
    return (
        <div className={`fixed top-16 right-10 bg-white rounded-full shadow-lg p-1`}>
            <button
                className="bg-blue-600 text-white rounded-full w-14 h-14 flex justify-center items-center text-2xl font-bold shadow-lg hover:bg-blue-700 transition-all duration-200"
                onClick={onClick}
            >
                <span className="leading-none">+</span> {/* 'leading-none' ile dikey hizalamayı sağlıyoruz */}
            </button>
        </div>
    );
}

export default AddButton;
