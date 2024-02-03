'use client'
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import AddMenuDialog from './AddMenu';
import DeleteMenuDialog from './DeleteMenuItem';

function EditMenuItem({ selectedRestaurant, fetchmenu, selectedMenuItem, onSave, setSelectedMenuItem }) {

    // const [isOpen, setIsOpen] = useState(false);
    const [ItemName, setItemName] = useState(selectedMenuItem.name);
    const [ItemPrice, setItemPrice] = useState(selectedMenuItem.price);

    // const handleOpen = () => setIsOpen(true);
    // const handleClose = () => { setIsOpen(false); }

    useEffect(() => {
        if (selectedMenuItem) {
            // Fetch data for the selected item
            setItemName(selectedMenuItem.name)
            setItemPrice(selectedMenuItem.price)

        }
    }, [selectedMenuItem]);



    const handleSubmit = async (event) => {
        event.preventDefault();
        // Handle submission logic here (e.g., send data to server)
        console.log('Item name:', ItemName);
        console.log('Item price:', ItemPrice);

        let ip = Number(ItemPrice)
        // ...
        let itemExists = false;

        // Enhanced check for item name and price match

        if (selectedMenuItem.name == ItemName && selectedMenuItem.price == ip) {
            itemExists = true;
            // Exit the loop early if a match is found
        }


        if (!itemExists) {
            try {
                const response = await fetch('/api/menu', {
                    method: 'PATCH',
                    body: JSON.stringify({
                        ItemName: ItemName,
                        ItemPrice: ip,
                        restaurantName: selectedRestaurant,
                        isEdit: true,
                        selectedMenuItem: selectedMenuItem
                    }),
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log('Item edited successfully:', data);
                    toast.success('Item edited successfully!', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        theme: "dark",
                    });
                    fetchmenu(selectedRestaurant)
                    onSave(); // Close the dialog after successful submission
                }
                else if (response.status === 409) {
                    console.log('Item name exists');
                    const errorMessage = 'Item name exists';
                    toast.error(errorMessage, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        theme: "dark",
                    });
                }
                else {
                    console.error('Failed to edit Item:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        else {
            const message = 'There is no change in the restaurant details';
            toast.info(message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                theme: "dark",
            });
            onSave();
        }
    };

    // handleOpen();

    return (

        <div>

            <h3 className="text-xl font-bold pb-4 ">Edit Item</h3>
            <div className="bg-white shadow-md rounded-lg">
                <div className="p-4">
                    <label htmlFor="ItemName" className="text-sm font-medium text-gray-700">
                        Item Name
                        <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                        type="text"
                        id="ItemName"
                        name="ItemName"
                        className="w-full border rounded shadow-sm py-2 px-4 mb-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        value={ItemName}
                        onChange={(e) => setItemName(e.target.value)}
                        required
                    />
                    <label htmlFor="ItemName" className="text-sm font-medium text-gray-700">
                        Item Price
                        <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                        type="text"
                        id="ItemPrice"
                        name="ItemPrice"
                        className="w-full border rounded shadow-sm py-2 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        value={ItemPrice}
                        onChange={(e) => setItemPrice(e.target.value)}
                        required
                    />
                    <div className='flex items-center pt-4'>
                        <button className="hover:bg-yellow-600 text-black bg-yellow-500 py-2 px-4 font-semibold rounded " onClick={handleSubmit}>Save</button>
                        <button className="m-4 bg-gray-200 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded" onClick={onSave}>Cancel</button>
                        <DeleteMenuDialog selectedRestaurant={selectedRestaurant} fetchmenu={fetchmenu} selectedMenuItem={selectedMenuItem} onDelete={() => setSelectedMenuItem('')} />
                    </div>
                </div>

            </div>


        </div>

    );

}

export default EditMenuItem