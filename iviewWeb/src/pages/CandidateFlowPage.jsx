import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useInterviewStore } from '../stores/useInterviewStore'; // Doğru store'dan import edildiğinden emin olun
import PersonalInfoFormPage from './PersonalInfoFormPage';
import InterviewFlowPage from './InterviewFlowPage'; // InterviewFlowPage bileşenini doğru şekilde import edin


const CandidateFlowPage = () => {
    const { uniqueId } = useParams(); // URL'den uniqueId'yi alıyoruz
    const { fetchInterview, interview, isLoading, error, personalInfoSubmitted } = useInterviewStore(); // fetchInterview burada mevcut olmalı

    useEffect(() => {
        console.log('uniqueId:', uniqueId);
        console.log('fetchInterview fonksiyonu:', fetchInterview); // fetchInterview'in mevcut olup olmadığını kontrol edin
        if (uniqueId) {
            fetchInterview(uniqueId);
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
