import axios from "axios";
import React, { useState } from 'react';
import useSWR from 'swr';
import Menu from "./Menu";

export default function EditMenu(props) {
      const [selectedItem, setSelectedItem] = useState("");
      const fetcher = async (url) => {
            const result = await axios.get(url);
            return result.data;
      };
      const { data: resArr, error } = useSWR(`/api/getClientRest/${props.user.email}`, fetcher);

      if (error) return <div>Error: {error.message}</div>;
      if (!resArr) return <div>Loading...</div>;

      return (
            <div className = "flex flex-col items-center justify-center space-y-4">
                  <select
                        value={selectedItem}
                        onChange={async (e) => {
                              setSelectedItem(e.target.value);
                        }}
                        className="bg-white border-2 border-blue-500 p-2 m-2 rounded-md text-blue-700 text-sm">
                        <option value="">Select an item</option>
                        {resArr.map((item, i) => (
                              <option key={i} value={item.name} >
                                    {item.name}
                              </option>
                        ))}
                  </select>
                  {selectedItem && <Menu email={props.user.email} restaurant={selectedItem}/>}
                  
            </div>
      )
}
