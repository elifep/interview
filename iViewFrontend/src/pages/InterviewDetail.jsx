import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import NoteSection from '../components/NoteSection';
import StatusToggle from '../components/StatusToggle';
import { useVideoStore } from '../stores/usevideoStore';

function InterviewDetail() {
    const { id } = useParams();
    const { videos, fetchVideos } = useVideoStore();
    const interview = videos.find((video) => video._id === id); // Find video by id

    const [note, setNote] = useState('');
    const [status, setStatus] = useState(interview?.status === 'Onaylandı');

    useEffect(() => {
        if (!interview) {
            fetchVideos(id);
        }
    }, [id, fetchVideos, interview]);

    const handleSave = () => {
        console.log('Note:', note);
        console.log('Status:', status ? 'Onaylandı' : 'Beklemede');
    };

    if (!interview) {
        return <div>Video not found</div>;
    }

    return (
        <div className="flex p-6 space-x-4">
            <div className="w-2/3">
                <h2 className="text-2xl font-semibold mb-4 ">{interview.candidate}</h2>
                <VideoPlayer videoUrl={interview.videoUrl} />
            </div>
            <div className="w-1/3">
                <div className="bg-white rounded-lg p-4 shadow-md">
                    <h3 className="text-lg font-semibold mb-4">Interview Notes</h3>
                    <NoteSection note={note} setNote={setNote} />
                </div>
                <div className="mt-4">
                    <StatusToggle status={status} setStatus={setStatus} />
                </div>
                <div className="mt-4 flex justify-end">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default InterviewDetail;

// import  { useState } from 'react';
// import { useParams } from 'react-router-dom'; // URL'den ID alabilmek için
// import VideoPlayer from '../components/VideoPlayer'; // Video oynatıcısı bileşeni
// import NoteSection from '../components/NoteSection'; // Not alma bileşeni
// import StatusToggle from '../components/StatusToggle'; // Durum değiştirme bileşeni
// import { useVideoStore } from '../stores/videoStore'; // Videoları store'dan çekiyoruz

// function InterviewDetail() {
//     const { id } = useParams(); // URL'den videonun ID'sini alıyoruz
//     const { videos } = useVideoStore(); // Videoları Zustand'dan çekiyoruz
//     const interview = videos.find((video) => video.id === parseInt(id)); // ID'ye göre videoyu buluyoruz

//     const [note, setNote] = useState('');
//     const [status, setStatus] = useState(interview.status === 'Approved'); // Varsayılan statü

//     const handleSave = () => {
//         // Kaydetme işlemi
//         console.log('Note:', note);
//         console.log('Status:', status ? 'Approved' : 'Pending');
//     };
//     if (!interview) {
//         return <div>Video not found</div>;
//     }
//     return (
//         <div className="flex p-6 space-x-4">
//             {/* Video Player */}
//             <div className="w-2/3">
//                 <h2 className="text-2xl font-semibold mb-4 ">{interview.candidate}</h2>
//                 <VideoPlayer videoUrl={interview.videoUrl} />
//             </div>

//             {/* Mülakat Soruları ve Notlar */}
//             <div className="w-1/3">
//                 <div className="bg-white rounded-lg p-4 shadow-md">
//                     <h3 className="text-lg font-semibold mb-4">Interview Notes</h3>
//                     <NoteSection note={note} setNote={setNote} />
//                 </div>

//                 <div className="mt-4">
//                     <StatusToggle status={status} setStatus={setStatus} />
//                 </div>

//                 <div className="mt-4 flex justify-end">
//                     <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleSave}>
//                         Save
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default InterviewDetail;
