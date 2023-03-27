import axios from "axios";
import React, { useState, useEffect } from 'react';

export default function EditMenu(props) {
      const [selectedItem, setSelectedItem] = useState("");
      const [resArr, setResArr] = useState([]);

      useEffect(() => {
            async function fetchData() {
                  const result = await axios.get('/api/getClientRest/' + props.user.email);
                  setResArr(result.data);
            }
            fetchData();
      }, []);

      return (
            <div>
                  <select value={selectedItem} onChange={(e) => setSelectedItem(e.target.value)}>
                        <option value="">Select an item</option>
                        {resArr.map((item,i) => (
                              <option key={i} value={item.name} >
                                    {item.name}
                              </option>
                        ))}
                  </select>
                  {selectedItem && <p>You have selected: {selectedItem}</p>}
            </div>
      )
}
