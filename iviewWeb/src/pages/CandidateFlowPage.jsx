import React,  { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useInterviewStore } from '../stores/useInterviewStore';
import PersonalInfoFormPage from './PersonalInfoFormPage';
import InterviewFlowPage from './InterviewFlowPage';

const CandidateFlowPage = () => {
    const { uniqueId } = useParams(); // URL'den uniqueId'yi alıyoruz
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
