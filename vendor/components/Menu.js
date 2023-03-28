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
    var t;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newFoodItem || !newPrice) return;
        //console.log(menuobj)
        if (menuobj.menu.some(item => { return ((item.name === newFoodItem) && (item.price === newPrice)) })) {
            alert("Food item already present in the menu")
        } else if (menuobj.menu.some(item => { return ((item.name === newFoodItem) && (item.price !== newPrice)) })) {
            alert("Updating")//price update
            await axios.post(`/api/modFoodItem/${props.email}?name=${props.restaurant}`, {
                name: newFoodItem,
                price: newPrice,
            });
        }
        else{
            alert("Adding new item")
            await axios.post(`/api/modFoodItem/${props.email}?name=${props.restaurant}`, {
                name: newFoodItem,
                price: newPrice,
            });
        }


        mutate(0, true, () => {
            setNewFoodItem("");
            setNewPrice("");
        });

    };

    const handleDelete = async (item) => {
        await axios.get(`/api/deleteFoodItem/${props.email}/?resName=${props.restaurant}&name=${item}`);
        mutate(0,true);
    };

    const handleEdit = async (newPrice, item) => {
        await axios.post(`/api/addFoodItem/${props.email}?name=${props.restaurant}`, {
            name: item,
            price: newPrice,
        });
        mutate(0,true);
    };
    const handleEdit1 = async (newPrice) => {
        t=newPrice
    };
    if (error) return <div>Error: {error.message}</div>;
    if (!menuobj) return <div>Loading...</div>;
    if (menuobj) {
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
                                onChange={(e) => handleEdit1(e.target.value)}
                            />
                            <button onClick={() => handleEdit(t,item.name)}>Edit</button>
                            <button onClick={() => handleDelete(item.name)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </>
        );
    }
}