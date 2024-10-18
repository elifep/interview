import React from 'react';

function StatusLabel({ published }) {
    return (
        <span className={`text-sm ${published ? 'text-green-600' : 'text-red-600'}`}>
            {published ? 'Published' : 'Unpublished'}
        </span>
    );
}

export default StatusLabel;
