
function EditButton({ onClick }) {
    return (
        <button
            onClick={onClick} // onEdit yerine onClick kullanıyoruz
            className="text-indigo-600 hover:text-indigo-800 transition duration-200"
        >
            <i className="fas fa-edit text-xl"></i> {/* Büyük ve modern ikon */}
        </button>
    );
}

export default EditButton;
