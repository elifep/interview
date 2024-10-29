import React from 'react';

const SettingsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Modal kapalıysa render etme

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"> {/* arka plan daha yumuşak */}
      <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-lg p-8 relative z-60"> {/* Daha küçük, responsive boyut ve daha büyük gölge */}
        {/* Modal Kapatma Butonu */}
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          &times; {/* X işareti */}
        </button>

        <h2 className="text-2xl font-semibold text-teal-700 mb-6">Settings</h2> {/* Daha büyük başlık ve teal rengi */}

        {/* Ayar Seçenekleri */}
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-lg text-gray-800">User Management</h3>
            <p className="text-gray-600 text-sm">Add or remove admin users, and adjust permissions.</p>
          </div>
          <div>
            <h3 className="font-medium text-lg text-gray-800">Notification Settings</h3>
            <p className="text-gray-600 text-sm">Manage email and SMS notification preferences.</p>
          </div>
          <div>
            <h3 className="font-medium text-lg text-gray-800">Application Settings</h3>
            <p className="text-gray-600 text-sm">Configure interview durations, deadlines, and statuses.</p>
          </div>
          <div>
            <h3 className="font-medium text-lg text-gray-800">Security Settings</h3>
            <p className="text-gray-600 text-sm">Manage 2FA, password settings, and more.</p>
          </div>
        </div>

        {/* İşlevsellik olmayan buton */}
        <div className="mt-8 flex justify-end">
          <button 
            onClick={onClose} 
            className="bg-teal-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-teal-700 transition duration-150"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
