import { useState } from 'react';

export default function EditMenu() {
      //form to enter name and price of item
      const [name, setName] = useState('');
      const [price, setPrice] = useState('');
  
      const handleSubmit = (e) => {
          e.preventDefault();
          console.log(`Name : ${name}, Price : ${price}`);
      };
      return (
          <form onSubmit={handleSubmit}>
              <label htmlFor="name">Enter name of item : </label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
  
              <label htmlFor="price">Enter price of item : </label>
              <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
  
              <button type="submit">Add Item</button>
          </form>
        );
}