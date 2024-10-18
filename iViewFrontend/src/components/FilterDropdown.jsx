import React, { useState } from 'react';

function FilterDropdown({ filters, onFilter }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                className="bg-indigo-600 text-white px-4 py-2 rounded-md"
                onClick={() => setIsOpen(!isOpen)}
            >
                Filter
            </button>
            {isOpen && (
                <div className="absolute mt-2 bg-white shadow-lg rounded-md p-2 z-10">
                    {filters.map((filter, index) => (
                        <div
                            key={index}
                            className="hover:bg-gray-200 px-4 py-2 cursor-pointer"
                            onClick={() => {
                                onFilter(filter);
                                setIsOpen(false);
                            }}
                        >
                            {filter}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default FilterDropdown;
