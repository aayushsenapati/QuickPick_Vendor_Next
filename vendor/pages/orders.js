import { useState } from 'react';
import axios from "axios";
import useSWR from 'swr';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Orders() {
    const { user, error: userError } = useUser();
    const [selectedRestaurant, setSelectedRestaurant] = useState("");
    const fetcher = url => axios.get(url).then(res => res.data);
    const { data: restaurants, error: restaurantsError } = useSWR(`/api/getClientRest/${user?.email}`, fetcher);
    const { data: orders, error: ordersError } = useSWR(selectedRestaurant ? `/api/${selectedRestaurant}` : null, fetcher);

    if (userError || restaurantsError) return <div>Error loading user or restaurants</div>;
    if (!restaurants) return <div>Loading restaurants...</div>;
    if (ordersError) return <div>Error loading orders</div>;

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl">
                <select
                    value={selectedRestaurant}
                    onChange={(e) => {
                        setSelectedRestaurant(e.target.value);
                    }}
                    className="bg-white border-2 border-blue-500 p-2 m-2 rounded-md text-blue-700 text-sm w-full">
                    <option value="">Select a restaurant</option>
                    {restaurants.map((restaurant, i) => (
                        <option key={i} value={restaurant.name}>
                            {restaurant.name}
                        </option>
                    ))}
                </select>
                {orders && (
                    <div className="grid grid-cols-3 gap-4">
                        {orders.map(item => (
                            <div className="rounded overflow-hidden shadow-lg p-6 bg-white" key={item._id}>
                                <ul>
                                    {item.fooditems.map((snack, i) => (
                                        <li className="text-xl m-2 mb-1" key={i}>{snack.name} - ₹{snack.price}</li>
                                    ))}
                                </ul>
                                <p className="text-2xl font-bold mt-4">Total Cost : ₹{item.cost}</p>
                                <p className="text-xl mt-2">Time Of Order : {item.ordertime}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}