// Header.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BellAlertIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Logo from '../assets/logo.svg'; // Logo dosyasını import ediyoruz

function Header({ onLogout }) {
    const [isVisible, setIsVisible] = useState(true);
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            // Eğer aşağı kaydırma ve belirli bir mesafe geçtiyse header'ı gizle
            setIsVisible(false);
        } else {
            // Yukarı kaydırma veya sayfanın en üstündeyse header'ı göster
            setIsVisible(true);
        }
        lastScrollY = window.scrollY;
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header
            className={`w-full bg-white shadow-md p-4 flex items-center justify-between fixed top-0 left-0 z-10 transition-transform duration-300 ${
                isVisible ? 'translate-y-0' : '-translate-y-full'
            }`}
        >
            <div className="flex items-center justify-between space-x-24">
                <img src={Logo} alt="Logo" className="w-32 h-auto" /> {/* Logoyu ekliyoruz */}
                <div className="text-xl font-bold text-teal-800"> Admin Page</div>
            </div>
            <div className="flex items-center space-x-4">
                <BellAlertIcon className="h-6 w-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
                <UserCircleIcon 
                    className="h-8 w-8 text-gray-600 hover:text-gray-800 cursor-pointer"
                    onClick={onLogout} // İkona tıklanınca logout fonksiyonunu çalıştır
                />
            </div>
        </header>
    );
}

// propTypes doğrulaması ekliyoruz
Header.propTypes = {
    onLogout: PropTypes.func.isRequired, // onLogout fonksiyon olmalı ve zorunlu
};

export default Header;
