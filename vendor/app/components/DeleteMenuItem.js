'use client'
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from "react-toastify";

function DeleteMenuDialog({ selectedRestaurant, fetchmenu, selectedMenuItem, onDelete }) {
    const [isOpen, setIsOpen] = useState(false);
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
        console.log('to delete');
        try {
            const response = await fetch('/api/menu', {
                method: 'DELETE',
                body: JSON.stringify({
                    restaurantName: selectedRestaurant,
                    selectedMenuItem: selectedMenuItem
                }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Item deleted successfully:', data);
                toast.success('Item deleted successfully!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    theme: "dark",
                });
                fetchmenu(selectedRestaurant);
                handleClose(); // Close the dialog after successful submission
                onDelete();
            }
            else {
                console.error('Failed to delete restaurant:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            {/* Button to open the dialog */}
            <button className="hover:bg-gray-200 text-gray-400 font-semibold py-2 px-4 rounded" onClick={handleOpen}>Delete Item</button>
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
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Item?</h3>
                                        <div className="mt-2">
                                            <form onSubmit={handleSubmit}>
                                                {/* <div className="grid grid-cols-2 gap-4">
                                                    <div className="col-span-1"> */}

                                                <p className="text-sm text-gray-400">Are you sure you want to delete the item?</p>
                                                <div className="mt-5 sm:mt-4 sm:flex sm:justify-end">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-black bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                        onClick={handleSubmit}
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                        onClick={handleClose}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>


                                                {/* </div>
                                                </div> */}
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

export default DeleteMenuDialog;
