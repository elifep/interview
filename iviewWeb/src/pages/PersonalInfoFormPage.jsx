import React, { useState } from 'react';
import { useInterviewStore } from '../stores/useInterviewStore'; // Store for managing interview flow

const PersonalInfoFormPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        phone: '',
        consent: false, // For checkbox consent
    });

    const { submitPersonalInfo, error } = useInterviewStore();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value, // Handle checkbox properly
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.consent) {
            submitPersonalInfo(formData); // Only submit if consent is true
        } else {
            alert('Please agree to the KVKK text.');
        }
    };
  
    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-md">
                <h2 className="text-xl font-semibold text-indigo-700 mb-4">Personal Information Form</h2>

                {/* Display error if there is any */}
                {error && <p className="text-red-600 mb-4">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <label className="block mb-2">Name*</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-md w-full mb-4"
                        required
                    />

                    <label className="block mb-2">Surname*</label>
                    <input
                        type="text"
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-md w-full mb-4"
                        required
                    />

                    <label className="block mb-2">Email*</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-md w-full mb-4"
                        required
                    />

                    <label className="block mb-2">Phone*</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-md w-full mb-4"
                        required
                    />

                    <div className="mb-4">
                        <label>
                            <input
                                type="checkbox"
                                name="consent"
                                checked={formData.consent}
                                onChange={handleChange}
                                className="mr-2"
                                required
                            />
                            I have read and approved the{' '}
                            <a href="#" className="text-indigo-700 underline">
                                KVKK text
                            </a>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 w-full"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PersonalInfoFormPage;
