import React from 'react';
import { useNavigate } from 'react-router-dom'; // Yönlendirme için hook
import { usePackageStore } from '../stores/packageStore'; // Zustand store'u import ediyoruz
import PackageTableHeader from '../components/PackageTableHeader'; // Tablo başlıkları
import PackageRow from '../components/PackageRow'; // Paket satırları

function ManagePackages() {
    const navigate = useNavigate(); // Yönlendirme için useNavigate hook'u
    const { packages, deletePackage } = usePackageStore(); // Zustand'dan state ve fonksiyonları alıyoruz
    const columns = ['Order', 'Package Name', 'Question Count', 'Action'];
    // Düzenleme sayfasına yönlendirme fonksiyonu
    const handleEdit = (pkg) => {
        navigate(`/edit-package/${pkg.id}`, { state: { name: pkg.name, count: pkg.count } });
    };

    return (
        <div className="w-full p-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-semibold text-indigo-700 mb-6">Manage Question Package</h2>

            <PackageTableHeader columns={columns}  />

            <div className="mt-4 space-y-2">
                {packages.map((pkg, index) => (
                    <PackageRow
                        key={pkg.id}
                        pkg={pkg}
                        index={index}
                        handleEdit={handleEdit} // Edit işlemi için handleEdit'i bileşene gönderiyoruz
                        deletePackage={deletePackage} // Silme işlemi
                    />
                ))}
            </div>
        </div>
    );
}

export default ManagePackages;

// import React from 'react';
// import { useNavigate } from 'react-router-dom'; // Yönlendirme için hook
// import { usePackageStore } from '../stores/packageStore'; // Zustand store'u import ediyoruz
// import PackageTableHeader from '../components/PackageTableHeader'; // Tablo başlıkları
// import PackageRow from '../components/PackageRow'; // Paket satırları

// function ManagePackages() {
//     const navigate = useNavigate(); // Yönlendirme için useNavigate hook'u
//     const { packages, deletePackage } = usePackageStore(); // Zustand'dan state ve fonksiyonları alıyoruz

//     // Düzenleme sayfasına yönlendirme fonksiyonu
//     const handleEdit = (pkg) => {
//         navigate(`/edit-package/${pkg.id}`, { state: { name: pkg.name, count: pkg.count } });
//     };

//     return (
//         <div className="w-3/4 p-6">
//             <h2 className="text-2xl font-semibold mb-6">Manage Question Package</h2>

//             <PackageTableHeader />

//             <div className="grid grid-cols-1 gap-4">
//                 {packages.map((pkg, index) => (
//                     <PackageRow
//                         key={pkg.id}
//                         pkg={pkg}
//                         index={index}
//                         handleEdit={handleEdit} // Edit işlemi için handleEdit'i bileşene gönderiyoruz
//                         deletePackage={deletePackage} // Silme işlemi
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default ManagePackages;
