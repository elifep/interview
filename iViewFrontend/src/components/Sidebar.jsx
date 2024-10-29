import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, ClipboardDocumentListIcon, Cog6ToothIcon, ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/solid';
import SettingsModal from './modals/SettingsModal'; // SettingsModal bileşenini dahil ettik

function Sidebar() {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false); // Pop-up'ın açılma/kapanma durumu

    const handleSettingsClick = () => {
        setIsSettingsOpen(true); // Settings butonuna tıklanınca modal açılır
    };

    const handleCloseSettings = () => {
        setIsSettingsOpen(false); // Modal'ı kapatma işlevi
    };

    return (
        <div className="w-64 bg-teal-500 text-white h-screen p-6 flex flex-col sticky top-0">
            <h3 className="text-lg font-semibold mt-14 mb-6">Menu</h3>
            <ul className="space-y-4">
                <li>
                    <Link to="/dashboard" className="flex items-center space-x-3 text-white hover:text-yellow-200 transition duration-200">
                        <HomeIcon className="w-6 h-6" />
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to="/manage-packages" className="flex items-center space-x-3 text-white hover:text-yellow-200 transition duration-200">
                        <ClipboardDocumentListIcon className="w-6 h-6" />
                        <span>Questions Manage Panel</span>
                    </Link>
                </li>
                <li>
                    <Link to="/interview-list" className="flex items-center space-x-3 text-white hover:text-yellow-200 transition duration-200">
                        <ChatBubbleLeftEllipsisIcon className="w-6 h-6" />
                        <span>Interview Manage Panel</span>
                    </Link>
                </li>
            </ul>
            <div className="mt-auto">
                <button 
                  onClick={handleSettingsClick} 
                  className="flex items-center space-x-3 text-white hover:text-teal-200 transition duration-200"
                >
                    <Cog6ToothIcon className="w-6 h-6" />
                    <span>Settings</span>
                </button>
            </div>

            {/* Settings Modal */}
            <SettingsModal isOpen={isSettingsOpen} onClose={handleCloseSettings} />
        </div>
    );
}

export default Sidebar;
