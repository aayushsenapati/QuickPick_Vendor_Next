'use client'
import React, { useState, useEffect, useContext } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import AddMenuDialog from '../components/AddMenu';
import AddRestaurantDialog from '../components/AddRestaurant';
import EditRestaurantDialog from '../components/EditRestaurant';
import DeleteRestaurantDialog from '../components/DeleteRestaurant';
import EditMenuItem from '../components/EditMenuItem';
import BaseLayout from '../components/BaseLayout';


export default function Restaurant() {

    // const [isOpen, setIsOpen] = useState(false);
    const [restaurants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState('');
    const [selectedMenuItem, setSelectedMenuItem] = useState('');
    // const [isEditing, setIsEditing] = useState('');
    const [menuItems, setMenuItems] = useState([]);
    const session = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/');
        },
    });

    const fetchRestaurants = async () => {
        try {
            if (session.data && session.data.user) {
                const response = await fetch(`/api/rest?email=${session.data.user.email}`);
                const data = await response.json();
                setRestaurants(data.restaurantNames);
            } else {
                // Handle the case where user data is not available
                console.log("user data not available");
            }
        } catch (error) {
            console.error(error);
        }

    };

    const fetchMenu = async (restaurantName) => {
        try {
            if (restaurantName) {
                const response = await fetch(`/api/menu?restaurantName=${restaurantName}&email=${session.data.user.email}`);
                const data = await response.json();
                console.log(data)
                setMenuItems(data.itemsWithPricing);
            }
            else {
                setMenuItems([]);
            }
        } catch (error) {
            console.error(error);
        }
    };


    const handleRestaurantChange = async (event) => {
        setSelectedRestaurant(event.target.value);
        fetchMenu(event.target.value);
        // setIsEditing('')
        setSelectedMenuItem('');

    };

    const setRestProps = (restName) => {
        setSelectedRestaurant(restName);
        //fetchMenu(restName);
    }


    const handleMenuItemSelection = (item) => {
        // console.log("Selected item:", item);
        console.log(selectedMenuItem)
        setSelectedMenuItem(item);
        console.log(selectedMenuItem)
        // setIsEditing(item); 
    };

    useEffect(() => {
        if (session && session.data && session.data.user) {
            fetchRestaurants();
            fetchMenu(selectedRestaurant);
        }
    }, [session, selectedRestaurant, selectedMenuItem]);


    return (
        <BaseLayout>
            <div className="container bg-gray-100 min-h-screen">

                {/* Column 1: Restaurant Selection */}
                <div className="flex justify-between items-center py-4 text-black">
                    <h2 className="text-2xl font-bold pl-16">Edit Restaurant</h2>
                    <div className="flex items-center pr-8">
                        <div className="text-lg font-semibold  text-gray-500 pr-4">{session?.data?.user?.email}</div>
                        <button className="justify-center items-center bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4  rounded" onClick={() => signOut()}>
                            Logout
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4 pl-16 pr-16">
                    <div className="col-span-1 p-4">
                        <div className="flex items-center justify-between pb-4">
                            <h3 className="text-xl font-bold ">Restaurants</h3>
                            {/* <button className="hover:bg-gray-100 text-sm text-blue-500 font-semibold rounded">
                            +ADD NEW
                        </button> */}
                            <AddRestaurantDialog setRestProps={setRestProps} />

                        </div>

                        <div className="w-full">
                            {restaurants ? (
                                <select value={selectedRestaurant} onChange={handleRestaurantChange} className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500">
                                    <option disabled value="">Select a restaurant</option>
                                    {restaurants.map((restaurant) => (
                                        <option key={restaurant} value={restaurant}>
                                            {restaurant}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                // ... handle empty restaurants case ...
                                <div className="text-center p-4">
                                    <h3 className="text-lg font-medium">No restaurants available.</h3>
                                    {/* <p className="mt-2 text-gray-600">Please try again later or contact support.</p> */}
                                </div>
                            )}
                            {selectedRestaurant && (
                                <div className="text-xl font-semibold text-center mt-4 p-4">
                                    Welcome, {selectedRestaurant}!
                                    <p className="mt-2 text-lg text-gray-600">Add the menu to your restaurant</p>
                                    <div className="flex items-center justify-between pt-16 ">
                                        {/* <button className="hover:bg-yellow-600 text-sm text-black bg-yellow-500 px-3 py-1 font-semibold rounded mr-4">
                                        Edit Restaurant Details
                                    </button>
                                    <button className="hover:bg-gray-100 text-sm text-gray-500 font-semibold px-3 py-1 rounded ml-4">
                                        Delete Restaurant
                                    </button> */}
                                        <EditRestaurantDialog selectedRestaurant={selectedRestaurant} />
                                        <DeleteRestaurantDialog selectedRestaurant={selectedRestaurant} setRestProps={setRestProps} />
                                    </div>
                                </div>

                            )}
                        </div>
                    </div>

                    {/* Column 2: Menu Display */}
                    <div className="col-span-1 p-4">
                        <div className="flex items-center justify-between pb-4">
                            <h3 className="text-xl font-bold ">Menu</h3>
                            {selectedRestaurant ? (
                                // <button className="hover:bg-gray-100 text-sm text-blue-500 font-semibold">
                                //     +ADD NEW
                                // </button>
                                <AddMenuDialog selectedRestaurant={selectedRestaurant} fetchmenu={fetchMenu} />
                            ) : null}

                        </div>
                        {selectedRestaurant && (
                            <div className="menu-items bg-white shadow-md rounded-lg p-4">
                                {menuItems.length > 0 ? (
                                    <div>
                                        {menuItems.map((item) => (
                                            <div
                                                key={item.name}
                                                className={`px-4 py-2 cursor-pointer hover:bg-gray-200 text-black rounded ${item === selectedMenuItem ? "bg-gray-700 text-white hover:bg-gray-600" : ""}`}
                                                onClick={() => handleMenuItemSelection(item)}
                                            >
                                                {item.name} - ₹{item.price}
                                            </div>

                                        ))}
                                    </div>
                                ) : (
                                    // ... handle empty menu case ...
                                    <div className="text-center">No items right now</div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Column 3: Edit Menu Item Form */}
                    <div className="col-span-1 p-4">

                        {selectedMenuItem && (

                            <EditMenuItem selectedRestaurant={selectedRestaurant} fetchmenu={fetchMenu} selectedMenuItem={selectedMenuItem} onSave={() => setSelectedMenuItem('')} setSelectedMenuItem={setSelectedMenuItem} />

                        )}
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}


