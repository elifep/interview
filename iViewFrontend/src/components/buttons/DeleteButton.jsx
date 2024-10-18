
function DeleteButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="text-red-600 hover:text-red-800 transition duration-200"
        >
            <i className="fas fa-trash text-xl"></i> {/* Büyük ve modern ikon */}
        </button>
    );
}

export default DeleteButton;
