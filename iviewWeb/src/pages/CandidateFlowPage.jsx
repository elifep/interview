import React,  { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useInterviewStore } from '../stores/useInterviewStore';
import PersonalInfoFormPage from './PersonalInfoFormPage';
import InterviewFlowPage from './InterviewFlowPage';

const CandidateFlowPage = () => {
<<<<<<< HEAD
    const { uniqueId } = useParams(); // URL'den uniqueId'yi alıyoruz
=======
    const { uniqueId } = useParams();
>>>>>>> 4a2f93eeaa170cc07469b40b7994db797303e4a9
    const { fetchInterview, interview, isLoading, error, personalInfoSubmitted } = useInterviewStore();

    useEffect(() => {
        if (uniqueId) {
            fetchInterview(uniqueId); // Backend'den mülakat bilgilerini çekiyoruz
        }
    }, [uniqueId, fetchInterview]);

    if (isLoading) {
        return <p>Mülakat bilgileri yükleniyor...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            {!personalInfoSubmitted ? (
                <PersonalInfoFormPage />
            ) : (
                interview ? <InterviewFlowPage interview={interview} /> : <p>Mülakat bulunamadı</p>
            )}
        </div>
    );
};

export default CandidateFlowPage;
