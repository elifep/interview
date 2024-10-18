import React from 'react';
import DeleteButton from './buttons/DeleteButton';
import EditButton from './buttons/EditButton';

function PackageRow({ pkg, index, handleEdit, deletePackage }) {
  return (
    <div className="grid grid-cols-[1fr_3fr_1fr_1fr] gap-4 items-center p-4 bg-white rounded-md shadow-md hover:bg-indigo-50 transition-all duration-200">
      <div className="text-indigo-700 font-semibold">{index + 1}</div> {/* Sıra numarası */}
      <div className="text-gray-700 truncate max-w-xs">{pkg.name}</div> {/* Paket adı uzunluk kontrolü */}
      <div className="text-gray-700">{pkg.count}</div>
      <div className="flex justify-center items-center space-x-2"> {/* Butonları ortaladık */}
        <EditButton onEdit={() => handleEdit(pkg)} />
        <DeleteButton onDelete={() => deletePackage(pkg.id)} />
      </div>
    </div>
  );
}

export default PackageRow;


// import React from 'react';
// import DeleteButton from './DeleteButton';
// import EditButton from './EditButton';

// function PackageRow({ pkg, index, handleEdit, deletePackage }) {
//   return (
//     <div className="grid grid-cols-[1fr_2fr_1fr_1fr] gap-4 items-center p-4 bg-white rounded-md shadow-sm">
//       <div>{index + 1}</div> {/* Sıra numarası */}
//       <div>{pkg.name}</div>
//       <div>{pkg.count}</div>
//       <div className="flex space-x-4">
//         <EditButton onEdit={() => handleEdit(pkg)} />
//         <DeleteButton onDelete={() => deletePackage(pkg.id)} />
//       </div>
//     </div>
//   );
// }

// export default PackageRow;
