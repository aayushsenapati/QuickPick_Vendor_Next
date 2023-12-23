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
            alert("Food item already present, please edit the price through the menu below")//price update
            // await axios.post(`/api/modFoodItem/${props.email}?name=${props.restaurant}`, {
            //     name: newFoodItem,
            //     price: newPrice,
            // });
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
            <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 flex-col">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newFoodItem">
                            Food Item
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newFoodItem" type="text" value={newFoodItem} onChange={(e) => setNewFoodItem(e.target.value)} />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPrice">
                            Price
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newPrice" type="text" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Add Item
                        </button>
                    </div>
                </form>
                <h1 className="text-2xl font-semibold text-gray-900 mb-4">{menuobj.name}</h1>
                <div className="flex flex-col mt-8">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Food Item
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Price
                                            </th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Delete</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {menuobj.menu.map((item, i) => (
                                            <tr key={i}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{item.name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input
                                                        type="number"
                                                        defaultValue={item.price}
                                                        onChange={(e) => handleEdit1(e.target.value)}
                                                        className="shadow appearance-none border rounded w-32 py-2 px-3 text-xs text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button onClick={() => handleEdit(t,item.name)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button onClick={() => handleDelete(item.name)} className="text-indigo-600 hover:text-indigo-900">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}