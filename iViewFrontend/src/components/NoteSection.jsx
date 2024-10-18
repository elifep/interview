import React from 'react';

function NoteSection({ note, setNote }) {
    return (
        <div>
            <textarea
                className="w-full h-40 p-2 border border-gray-300 rounded-md"
                placeholder="Note..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
            ></textarea>
        </div>
    );
}

export default NoteSection;
