import PropTypes from 'prop-types'; // prop-types paketini import ediyoruz
import { BellAlertIcon, UserCircleIcon } from '@heroicons/react/24/outline';

function Header({ onLogout }) {
    return (
        <header className="w-full bg-white shadow-md p-4 flex items-center justify-between">
            <div className="text-xl font-bold text-indigo-800">Remote-tech Admin Page</div>
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
