'use client'
import React, { useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import BaseLayout from '../components/BaseLayout';

export default function Restaurant() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [orderItems, setOrderItems] = useState([]);

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
        
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOrder = async (restaurant) => {
    try {
      const response = await fetch(`/api/orders?restaurant=${restaurant}`);
      const data = await response.json();
      if (data.orderData) {
        setOrderItems(prevState => [...data.orderData]);
      } else {
        setOrderItems([]); // Clear the previous orders if no orders are found for the selected restaurant
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleRestaurantChange = (event) => {
    setSelectedRestaurant(event.target.value);
  };

  const handleDoneButtonClick = async (orderId, currentStatus) => {
    let newStatus = '';
    if (currentStatus === 'In-Progress') {
      newStatus = 'Ready';
    } else if (currentStatus === 'Ready') {
      newStatus = 'Collected';
    }
    try {
      const response = await fetch('/api/orders', {
        method: 'PATCH',
        body: JSON.stringify({
          id: orderId,
          newStatus: newStatus,
        }),
      });

      if (response.ok) {
        
        // Update the state directly
        setOrderItems(prevState => prevState.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        ));
      } else {
        console.error('Failed to update order status');
      }
    } catch (error) {
      console.error('Error during status update request', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In-Progress':
        return 'red-border';
      case 'Ready':
        return 'green-border';
      default:
        return '';
    };
  };

  useEffect(() => {
    if (session) {
      fetchRestaurants();
    }
    if (selectedRestaurant) {
      fetchOrder(selectedRestaurant);
    }
  }, [session, selectedRestaurant]);

  return (
    <BaseLayout>
      <div className="bg-gray-100 min-h-screen">
        <div className="py-4 text-black">
          <div className="container mx-auto flex justify-between items-center">
            <h2 className="text-2xl ml-16 font-bold">Orders</h2>
            <div className="flex items-center">
              <div className="text-lg font-semibold text-gray-500 pr-4">{session?.data?.user?.email}</div>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 mr-16 rounded" onClick={() => signOut()}>
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto pt-8">
          <div className="px-4 md:px-10">
            <div className="mb-8">
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
                <div className="text-center p-4">
                  <h3 className="text-lg font-medium">No restaurants available.</h3>
                </div>
              )}
            </div>

            {selectedRestaurant && (
              <div className="flex flex-col md:flex-row">
                <div className="md:mr-8 mb-8 md:w-1/2 overflow-y-auto">
                  <div className="bg-white p-8 rounded-md shadow-md">
                    <h2 className='text-xl font-semibold pb-5'>In-Progress Orders</h2>
                    {orderItems
                      .filter((order) => order.status === 'In-Progress')
                      .map((order) => (
                        <div key={order.id} className={`order-box ${getStatusColor(order.status)}`}>
                          <h3 className='text-black font-semibold'>Order #{order.id}</h3>
                          <p className='py-1'>Status: {order.status}</p>
                          <ul className="divide-y divide-gray-200">
                            <li className="flex justify-between items-center py-2">
                              <div className="flex items-center space-x-4">
                                <span className="font-semibold">Item</span>
                              </div>
                              <div className="flex items-center space-x-4">
                                <span className="font-semibold">Qty</span>
                              </div>
                              <div className="flex items-center space-x-4">
                                <span className="font-semibold">Price</span>
                              </div>
                            </li>
                            {order.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="flex justify-between items-center py-2">
                                <div className="flex items-center space-x-4">
                                  <span>{item.name}</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                  <span>{item.quantity}</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                  <span>{item.price}</span>
                                </div>
                              </li>
                            ))}
                          </ul>
                          <div className='py-3'>
                            <button className='doneButton' onClick={() => handleDoneButtonClick(order.id, order.status)}>
                              Done
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="md:w-1/2 overflow-y-auto">
                  <div className="bg-white p-8 rounded-md shadow-md">
                    <h2 className='text-xl font-semibold pb-5'>Ready Orders</h2>
                    {orderItems
                      .filter((order) => order.status === 'Ready')
                      .map((order) => (
                        <div key={order.id} className={`order-box ${getStatusColor(order.status)}`}>
                          <h3 className='text-black font-semibold'>Order #{order.id}</h3>
                          <p className='py-1'>Status: {order.status}</p>
                          <ul className="divide-y divide-gray-200">
                            <li className="flex justify-between items-center py-2">
                              <div className="flex items-center space-x-4">
                                <span className="font-semibold">Item</span>
                              </div>
                              <div className="flex items-center space-x-4">
                                <span className="font-semibold">Qty</span>
                              </div>
                              <div className="flex items-center space-x-4">
                                <span className="font-semibold">Price</span>
                              </div>
                            </li>
                            {order.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="flex justify-between items-center py-2">
                                <div className="flex items-center space-x-4">
                                  <span>{item.name}</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                  <span>{item.quantity}</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                  <span>{item.price}</span>
                                </div>
                              </li>
                            ))}
                          </ul>
                          <div className='py-3'>
                            <button className='doneButton' onClick={() => handleDoneButtonClick(order.id, order.status)}>
                              Done
                            </button>
                          </div>

                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

