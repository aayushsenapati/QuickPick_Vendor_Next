import { useState } from 'react';


export default function AddRest() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [upi, setUpi] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Name : ${name}, Address : ${address}, UPI : ${upi}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      
      <label htmlFor="name">Enter your restaurant name : </label>
      <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />

      <label htmlFor="description">Add your address : </label>
      <textarea id="description" value={address} onChange={(e) => setAddress(e.target.value)} />

      <label htmlFor="address">Please enter in your UPI id : </label>
      <input type="text" id="address" value={upi} onChange={(e) => setUpi(e.target.value)} />

      <button type="submit">Add Restaurant</button>
    </form>
  );
}