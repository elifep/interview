import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useInterviewStore } from '../stores/useInterviewStore';

const PersonalInfoForm = () => {
  const navigate = useNavigate();
  const { uniqueId } = useParams(); // uniqueId rota parametresinden alınıyor
  const { submitPersonalInfo, isLoading, error, clearError } = useInterviewStore();

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phoneNumber: '',
  });

  // Her değişiklikte formu günceller ve hata varsa temizler
  const handleChange = (e) => {
    clearError();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Form gönderildiğinde çalışacak fonksiyon
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form doğrulama
    if (!formData.name || !formData.surname || !formData.email || !formData.phoneNumber) {
      alert('Lütfen tüm alanları doldurunuz.');
      return;
    }

    try {
      // Kişisel bilgileri store'a kaydedip backend'e gönderiyoruz
      await submitPersonalInfo({
        ...formData,
        uniqueId, // uniqueId'yi de ekliyoruz
      });

      // Video kayıt ekranına yönlendiriyoruz
      navigate(`/interview/${uniqueId}`);
    } catch (err) {
      console.error('Kişisel bilgiler gönderilirken hata oluştu:', err);
      alert('Kişisel bilgiler gönderilirken bir hata oluştu.');
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-indigo-700 mb-4">Kişisel Bilgi Formu</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Adınız</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Soyadınız</label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">E-posta</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Telefon Numarası</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Gönderiliyor...' : 'Devam Et'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
