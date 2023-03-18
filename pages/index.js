import { useState, useEffect } from 'react';
import axios from "axios";
import Image from "next/image";
import Script from "next/script";
import Head from "next/head";

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {

            const result = await axios.get('http://localhost:3001/data/GJB');
            setData(result.data)
            console.log(result.data);
        }
        fetchData();
        setInterval(fetchData, 5000); // Fetch data every minute
    }, []);

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
            <Image src="/images/test.png" width={500} height={500}></Image>
        </>
    );
}

export default App;