'use client'
import React, { useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import BaseLayout from '../components/Baselayout';

export default function Restaurant() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [orderItems, setOrderItems] = useState([]);
  const [newStatus, setnewStatus] = useState('');
  // const [orderId, setorderId]=useState('');


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




  

const handleDoneButtonClick = async(orderId, currentStatus) => {

  // Determine the new status based on the current status
  // switch (currentStatus) {
  //   case 'In-Progress':
  //     setnewStatus('Ready');
  //     console.log("afterchanging: ",newStatus)
  //     break;
  //   case 'Ready':
  //     setnewStatus('Completed');
  //     console.log("afterchanging: ",newStatus)
  //     break;
  //   default:
  //     // Do nothing for other status values
  //     return;
  // }

  if(currentStatus=='In-Progress')
  {
    setnewStatus('Ready');
    console.log("afterchanging: ",newStatus)
  }
  else if(currentStatus=='Ready'){
    setnewStatus('Completed');
      console.log("afterchanging: ",newStatus)

  }
  else
  {
  }
  // setorderId(orderId);
  // console.log("orderidtakenn:",orderId)
  // Update the status using the existing handleUpdateStatus function
//   handleUpdateStatus();

// };

// const handleUpdateStatus = async () => {
//   // event.preventDefault();
//   console.log("orderid:",orderId)
//   console.log("newstatus:",newStatus)
  try {
    
    const response = await fetch('/api/orders', {
      method: 'PATCH',
      body: JSON.stringify({
        id: orderId,
        newStatus: newStatus,
      }),

    });

    if(response.ok) {
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
    <div className='content'>
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
          <div className="order-items">
            <h2>Orders for {selectedRestaurant}</h2>
            {orderItems.map((order, orderIndex) => (
              <div key={orderIndex} className={`order-box ${getStatusColor(order.status)}`}>
                <h3>Order #{orderIndex + 1}</h3>
                <p>Status: {order.status}</p>
                <ul>
                  {order.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      Item: {item.name}
                      Price: {item.price}
                      Quantity: {item.quantity}
                    </li>
                  ))}
                </ul>
                <button onClick={() => handleDoneButtonClick(order.id, order.status)}>
                  Done
                </button>
              </div>
            ))}
          </div>
        )}


      </div>
    </div>
  </BaseLayout>
);
}

