import React from 'react';

function StatusToggle({ status, setStatus }) {
    return (
        <div className="flex items-center">
            <label className="mr-2">Status:</label>
            <label className="switch">
                <input type="checkbox" className='w-6 h-6' checked={status} onChange={() => setStatus(!status)} />
                <span className="slider round"></span>
            </label>
        </div>
    );
}

export default StatusToggle;
