import React from 'react';

function PackageTableHeader({ columns }) {
    return (
        <div className="grid grid-cols-[1fr_3fr_1fr_1fr] gap-4 bg-indigo-700 text-white p-4 rounded-md shadow-md">
            {columns.map((column, index) => (
                <span key={index} className={`font-bold ${index === columns.length - 1 ? 'text-center' : ''}`}>
                    {column}
                </span>
            ))}
        </div>
    );
}

export default PackageTableHeader;

// src/components/PackageTableHeader.jsx
// import React from 'react';

// function PackageTableHeader() {
//     return (
//         <div className="grid grid-cols-[1fr_2fr_1fr_1fr] gap-4 bg-gray-200 p-4 rounded-md">
//             <span className="font-bold">Order</span>
//             <span className="font-bold">Package Name</span>
//             <span className="font-bold">Question Count</span>
//             <span className="font-bold">Action</span>
//         </div>
//     );
// }

// export default PackageTableHeader;
