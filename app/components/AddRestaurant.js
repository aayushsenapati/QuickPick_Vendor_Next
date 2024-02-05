'use client'
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from "react-toastify";
import { redirect } from 'next/navigation';

function AddRestaurantDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [restaurantName, setRestaurantName] = useState('');
    const [upiId, setUpiId] = useState('');
    const [restaurantImage, setRestaurantImage] = useState(null);
    const session = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/');
        },
    });

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Restaurant Name:', restaurantName);
        console.log('UPI ID:', upiId);
        try {
            const formData = new FormData();
            formData.append('restaurantName', restaurantName);
            formData.append('upiId', upiId);
            formData.append('email', session.data.user.email);
            formData.append('image', restaurantImage);

            const response = await fetch('/api/rest', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Restaurant added successfully:', data);
                toast.success('Restaurant added successfully!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    theme: "dark",
                });
                handleClose(); // Close the dialog after successful submission
                setRestaurantName('');
                setUpiId('');
                setRestaurantImage(null);

            }
            else if (response.status === 409) {
                console.log('Restaurant name exists');
                const errorMessage = 'Restaurant name exists';
                toast.error(errorMessage, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    theme: "dark",
                });
            }
            else {
                console.error('Failed to add restaurant:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            {/* Button to open the dialog */}
            <button className="hover:bg-gray-100 text-sm text-blue-500 font-semibold rounded" onClick={handleOpen}>
                +ADD NEW
            </button>

            {/* Dialog content (only visible when isOpen is true) */}
            {isOpen && (
                <div className="fixed z-50 overflow-y-auto inset-0 outline-none focus:outline-none">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <div
                            className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                        >
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Add Restaurant</h3>
                                        <div className="mt-2">
                                            <form onSubmit={handleSubmit}>
                                                <label htmlFor="restaurantName" className="text-sm font-medium text-gray-700">
                                                    Restaurant Name
                                                    <span className="text-red-500 ml-1">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    id="restaurantName"
                                                    name="restaurantName"
                                                    className="w-full border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                    value={restaurantName}
                                                    onChange={(e) => setRestaurantName(e.target.value)}
                                                    required
                                                />
                                                <label htmlFor="upiId" className="text-sm font-medium text-gray-700">
                                                    UPI ID
                                                    <span className="text-red-500 ml-1">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    id="upiId"
                                                    name="upiId"
                                                    className="w-full border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                    value={upiId}
                                                    onChange={(e) => setUpiId(e.target.value)}
                                                    required
                                                />
                                                <label htmlFor="restaurantImage" className="text-sm font-medium text-gray-700">
                                                    Restaurant Image
                                                    <span className="text-red-500 ml-1">*</span>
                                                </label>
                                                <input
                                                    type="file"
                                                    id="restaurantImage"
                                                    name="restaurantImage"
                                                    accept=".jpg"
                                                    className="w-full border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                    onChange={(e) => setRestaurantImage(e.target.files[0])}
                                                    
                                                />
                                                <div className="mt-5 sm:mt-4 sm:flex sm:justify-end">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-black bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                        onClick={handleSubmit}
                                                    >
                                                        Add
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                        onClick={handleClose}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </div>
    )
}

export default AddRestaurantDialog;