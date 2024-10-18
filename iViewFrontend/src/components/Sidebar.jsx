import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, ClipboardDocumentListIcon, Cog6ToothIcon, ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/solid'; // Interview için ikon ekledik

function Sidebar() {
    return (
        <div className="w-64 bg-indigo-700 text-white h-screen p-6 flex flex-col sticky top-0"> {/* sticky yapısı ile sabit kalacak */}
            <h3 className="text-xl font-semibold mb-6">Menu</h3>
            <ul className="space-y-4">
                <li>
                    <Link to="/dashboard" className="flex items-center space-x-3 text-white hover:text-indigo-200 transition duration-200">
                        <HomeIcon className="w-6 h-6" />
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to="/manage-packages" className="flex items-center space-x-3 text-white hover:text-indigo-200 transition duration-200">
                        <ClipboardDocumentListIcon className="w-6 h-6" />
                        <span>Questions Manage Panel</span>
                    </Link>
                </li>
                <li>
                    <Link to="/interview-list" className="flex items-center space-x-3 text-white hover:text-indigo-200 transition duration-200">
                        <ChatBubbleLeftEllipsisIcon className="w-6 h-6" />
                        <span>Interview Manage Panel</span> {/* Interview kısmını ekledik */}
                    </Link>
                </li>
            </ul>
            <div className="mt-auto">
                <Link to="/settings" className="flex items-center space-x-3 text-white hover:text-indigo-200 transition duration-200">
                    <Cog6ToothIcon className="w-6 h-6" />
                    <span>Settings</span>
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;


// import React from 'react';
// import { Link } from 'react-router-dom'; // Yönlendirme için Link bileşeni

// function Sidebar() {
//     return (
//         <div className="w-1/4 bg-gray-200 p-4">
//             <h3 className="text-lg font-semibold mb-4">Menu</h3>
//             <ul>
//                 <li className="mb-2">
//                     {/* ManagePackages sayfasına yönlendirme */}
//                     <Link to="/manage-packages" className="flex items-center text-gray-700 hover:text-black">
//                         📄 Manage Question Package
//                     </Link>
//                 </li>
//                 <li>
//                     {/* Interview List sayfasına yönlendirme */}
//                     <Link to="/interview-list" className="flex items-center text-gray-700 hover:text-black">
//                         📋 Interview List
//                     </Link>
//                 </li>
//             </ul>
//         </div>
//     );
// }

// export default Sidebar;
