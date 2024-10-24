import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PersonalInfoFormPage from './pages/PersonalInfoFormPage';
import InterviewFlowPage from './pages/InterviewFlowPage';
import CandidateFlowPage from './pages/CandidateFlowPage';

function App() {
    return (
        <Router>
            <Routes>
                {/* Kişisel Bilgi Formu Ana Sayfa */}
                <Route path="/" element={<PersonalInfoFormPage />} />
                
                {/* Adayların başvuru linkinden başlattığı mülakat için dinamik rota */}
                <Route path="/apply/:uniqueId" element={<CandidateFlowPage />} />

                {/* Kişisel bilgi formu sayfası */}
                <Route path="/personal-info" element={<PersonalInfoFormPage />} />

                {/* Mülakat akışını yöneten sayfa */}
                <Route path="/interview" element={<InterviewFlowPage />} />
            </Routes>
        </Router>
    );
}

export default App;
