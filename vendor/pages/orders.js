import { useState, useEffect } from 'react';
import axios from "axios";
import useSWR from 'swr'

export default function Orders() {

    const fetcher = url => axios.get(url).then(res => res.data)

    const { data, error } = useSWR('/api/Pircube', fetcher)
    if (error) return <div>failed to load</div>
    if (data) {
        return (
            <>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {data.map(item => (
                        <div style={{ border: "5px solid black", display: "block", padding: "3vw", width: "20vw" }} key={item._id}>
                            <ul>
                                {item.fooditems.map((snack, i) => (
                                    <li style={{ fontSize: "2vw", margin: "10px", marginBottom: "2px" }} key={i}>{snack.name} - ₹{snack.price}</li>
                                ))}
                            </ul>
                            <p style={{ fontSize: "4vh" }}>Total Cost : ₹{item.cost}</p>
                            <p style={{ fontSize: "3vh" }}>Time Of Order : {item.ordertime}</p>

                        </div>
                    ))}
                </div>

            </>
        );
    }

}