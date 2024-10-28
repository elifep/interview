// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, ClipboardDocumentListIcon, Cog6ToothIcon, ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/solid';

function Sidebar() {
    return (
        <div className="w-64 bg-teal-500 text-white h-screen p-6 flex flex-col sticky top-0"> {/* sticky yapısı ile sabit kalacak */}
            <h3 className="text-lg font-semibold mt-14 mb-6">Menu</h3> {/* Başlık daha aşağıya taşındı */}
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
                        <span>Interview Manage Panel</span> {/* Interview kısmını ekledik */}
                    </Link>
                </li>
            </ul>
            <div className="mt-auto">
                <Link to="/settings" className="flex items-center space-x-3 text-white hover:text-teal-200 transition duration-200">
                    <Cog6ToothIcon className="w-6 h-6" />
                    <span>Settings</span>
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;
