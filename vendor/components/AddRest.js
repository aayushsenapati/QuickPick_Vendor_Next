import { useState,useRef } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import axios from "axios";


export default function AddRest() {
  const [name, setName] = useState('');
  const [upi, setUpi] = useState('');
  const { user, error, isLoading } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get('/api/newRest/'+user.email+`?name=${name}&upi=${upi}`)
    .then((e)=>{console.log(e)},()=>{conslode.log("There was an error in api/newRest")})
    alert("Restaurant added successfully")
    setName('');
    setUpi('');
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (user) {
    return (
      <form onSubmit={handleSubmit} >

        <label htmlFor="name">Enter your restaurant name : </label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />


        <label htmlFor="upi">Please enter in your UPI id : </label>
        <input type="text" id="upi" value={upi} onChange={(e) => setUpi(e.target.value)} />

        <button type="submit">Add Restaurant</button>
      </form>
    );
  }
}