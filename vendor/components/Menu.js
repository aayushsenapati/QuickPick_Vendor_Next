import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";

export default function EditMenu(props) {
    const [newFoodItem, setNewFoodItem] = useState("");
    const [newPrice, setNewPrice] = useState("");

    const fetcher = async (url) => {
        const result = await axios.get(url);
        return result.data;
    };
    const { data: menuobj, error, mutate } = useSWR(
        `/api/getClientRest/${props.email}/?name=${props.restaurant}`,
        fetcher
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newFoodItem || !newPrice) return;
        if (menuobj.menu.some(item => {item.name === newFoodItem;item.price===newPrice})) {
            alert("Food item already present in the menu")
        } else if(menuobj.menu.some(item => {item.name === newFoodItem;item.price!==newPrice})){
            await axios.post(`/api/addFoodItem/${props.email}?name=${props.restaurant}`, {
                name: newFoodItem,
                price: newPrice,
            });//price update
        }

        

        setNewFoodItem("");
        setNewPrice("");

        mutate();
    };

    const handleDelete = async (itemId) => {
        await axios.delete(`/api/deleteFoodItem/${menuobj._id}/${itemId}`);
        mutate();
    };

    const handleEdit = async (itemId, newPrice) => {
        await axios.put(`/api/editPrice/${menuobj._id}/${itemId}`, {
            price: newPrice,
        });
        mutate();
    };

    if (error) return <div>Error: {error.message}</div>;
    if (!menuobj) return <div>Loading...</div>;

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Food Item:
                    <input
                        type="text"
                        value={newFoodItem}
                        onChange={(e) => setNewFoodItem(e.target.value)}
                    />
                </label>
                <label>
                    Price:
                    <input
                        type="text"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                    />
                </label>
                <button type="submit">Add Item</button>
            </form>

            <h1>{menuobj.name}</h1>
            <ul>
                {menuobj.menu.map((item, i) => (
                    <li key={i}>
                        {item.name}
                        <input
                            type="text"
                            defaultValue={item.price}
                            onChange={(e) => handleEdit(item._id, e.target.value)}
                        />
                        <button onClick={() => handleDelete(item._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </>
    );
}