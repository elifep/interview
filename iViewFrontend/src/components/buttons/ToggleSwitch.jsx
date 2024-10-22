function ToggleSwitch({ isPublished, onToggle }) {
    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                checked={!!isPublished} // isPublished undefined olursa false'a dönüşür
                onChange={onToggle}
                className="sr-only"
            />
            <div className={`w-12 h-6 rounded-full transition-colors duration-300 ${isPublished ? 'bg-green-500' : 'bg-gray-300'} flex items-center justify-start`}>
                <div
                    className={`h-5 w-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out
                    ${isPublished ? 'translate-x-6' : 'translate-x-1'}`}
                />
            </div>
        </label>
    );
}

export default ToggleSwitch;
