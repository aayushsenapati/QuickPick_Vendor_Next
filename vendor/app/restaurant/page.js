'use client'
import React, { useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Sidebar from '../components/Sidebar';

export default function Restaurant() {
    const [restaurants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState('');
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
          const response = await fetch(`/api/menu?restaurantName=${restaurantName}&email=${session.data.user.email}`);
          const data = await response.json();
          setMenuItems(data.itemsWithPricing);
        } catch (error) {
          console.error(error);
        }
      };
      

    const handleRestaurantChange = async (event) => {
        setSelectedRestaurant(event.target.value);
        fetchMenu(event.target.value); 
      
        // try {
        //   const response = await fetch(`/api/menu?restaurantName=${event.target.value}&email=${session.data.user.email}`);
        //   const data = await response.json();
        //   setMenuItems(data.itemsWithPricing);
        // } catch (error) {
        //   console.error(error);
        // }
      };

    useEffect(() => {
        if (session && session.data && session.data.user) {
            fetchRestaurants();
            fetchMenu(selectedRestaurant);
        }
    }, [session,selectedRestaurant]);

    return (
        <div>
            {/* ... Sidebar and other components ... */}
            <div className="p-8">
                <div className="text-black">{session?.data?.user?.email}</div>
                <button className="text-black" onClick={() => signOut()}>
                    Logout
                </button>
                <select value={selectedRestaurant} onChange={handleRestaurantChange}>
                    <option value="">Select a restaurant</option>
                    {restaurants.map((restaurant) => (
                        <option key={restaurant} value={restaurant}>
                            {restaurant}
                        </option>
                    ))}
                </select>
                {selectedRestaurant && (
                    <div className="menu-items">
                        <h2>Menu for {selectedRestaurant}</h2>
                        <ul>
                            {menuItems.map((item) => (
                                <li key={item.name}>
                                    {item.name} - ₹{item.price}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
