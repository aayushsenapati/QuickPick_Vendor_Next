'use client'
import React, { useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import BaseLayout from '../components/BaseLayout';

export default function Restaurant() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [orderItems, setOrderItems] = useState([]);
  // const [newStatus, setnewStatus] = useState('');


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

  const fetchOrder = async (restaurant) => {
    try {
      const response = await fetch(`/api/orders?restaurant=${restaurant}`);
      const data = await response.json();
      if (data.orderData) {
        setOrderItems(prevState => [...data.orderData]);
      };
      console.log("state :", orderItems, "data :", data.orderData);
    } catch (error) {
      console.error(error);
    }
  };


  const handleRestaurantChange = (event) => {
    setSelectedRestaurant(event.target.value);
  };



  const handleDoneButtonClick = async (orderId, currentStatus) => {

    let newStatus = ''
    // setnewStatus(currentStatus)
    // console.log("beforechanging: ", newStatus)
    if (currentStatus == 'In-Progress') {
      // setnewStatus('Ready');
      newStatus = 'Ready'
      console.log("afterchanging: ", newStatus)
    }
    else if (currentStatus == 'Ready') {
      // setnewStatus('Collected');
      newStatus = 'Collected'
      console.log("afterchanging: ", newStatus)

    }
    else {
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
        console.log('Order status updated successfully');
        // Optionally, you can refresh the order list or update the specific order in the state
        fetchOrder(selectedRestaurant);
      } else {
        console.error('Failed to update order status');
        // Handle error, maybe show an error message to the user
      }
    } catch (error) {
      console.error('Error during status update request', error);
      // Handle unexpected errors
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
      fetchOrder(selectedRestaurant)
    }

  }, [session, selectedRestaurant]);

  return (
    <BaseLayout>
      <div className="">
        <div className="flex justify-between items-center py-4 text-black">
          <h2 className="text-2xl font-bold pl-16">Orders</h2>
          <div className="flex items-center pr-8">
            <div className="text-xl font-semibold pr-4 pt-2">{session?.data?.user?.email}</div>
            <button className="justify-center items-center bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded" onClick={() => signOut()}>
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className='px-10'>
        <div className='restaurant-select'>
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
        </div>
        {selectedRestaurant && (
          <div className="order-container">
            <div className="px-10 py-10 flex">
              <div className="in-progress-orders px-10 py-10 overflow-y-auto">
                <h2 className='text-xl font-semibold pr-4 py-5 px-8'>In-Progress Orders</h2>
                {orderItems
                  .filter((order) => order.status === 'In-Progress')
                  .map((order) => (
                    <div key={order.id} className={`order-box ${getStatusColor(order.status)}`}>
                      <h3 className='text-black font-semibold'>Order #{order.id}</h3>
                      <p className='py-1'>Status: {order.status}</p>
                      <ul>
                        <li className="flex justify-between border-b-2 border-gray-200 py-2">
                          <div className="flex flex-col">
                            <span className="font-semibold">Item</span>
                          </div>
                          <div className="flex flex-col text-right">
                            <span className="font-semibold">Qty</span>
                          </div>
                          <div className="flex flex-col text-right">
                            <span className="font-semibold">Price</span>
                          </div>
                        </li>
                        {order.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex justify-between border-b-2 border-gray-200 py-2">
                            <div className="flex flex-col">
                              <span>{item.name}</span>
                            </div>
                            <div className="flex flex-col text-right">
                              <span>{item.quantity}</span>
                            </div>
                            <div className="flex flex-col text-right">
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
              <div className="ready-orders px-10 py-10 overflow-y-auto">
                <h2 className='text-xl font-semibold pr-4 py-5 px-8'>Ready Orders</h2>
                {orderItems
                  .filter((order) => order.status === 'Ready')
                  .map((order) => (
                    <div key={order.id} className={`order-box ${getStatusColor(order.status)}`}>
                      <h3 className='text-black font-semibold'>Order #{order.id}</h3>
                      <p className='py-1'>Status: {order.status}</p>
                      <ul>
                        <li className="flex justify-between border-b-2 border-gray-200 py-2">
                          <div className="flex flex-col">
                            <span className="font-semibold">Item</span>
                          </div>
                          <div className="flex flex-col text-right">
                            <span className="font-semibold">Qty</span>
                          </div>
                          <div className="flex flex-col text-right">
                            <span className="font-semibold">Price</span>
                          </div>
                        </li>
                        {order.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex justify-between border-b-2 border-gray-200 py-2">
                            <div className="flex flex-col">
                              <span>{item.name}</span>
                            </div>
                            <div className="flex flex-col text-right">
                              <span>{item.quantity}</span>
                            </div>
                            <div className="flex flex-col text-right">
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
    </BaseLayout>
  );

}
