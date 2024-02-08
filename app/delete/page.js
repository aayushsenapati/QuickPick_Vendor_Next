'use client'

import React, { useState } from 'react';
import DeleteUserDialog from '../components/DeleteUserDialog';

const DeleteAccount = () => {
    const [email, setEmail] = useState('');
    const [isOpen, setIsOpen] = useState(false);
  
    const handleDelete = () => {
      setIsOpen(true);
    };
  
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-yellow-500">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="p-4 border-2 border-black rounded-md text-lg w-1/2"
        />
        <button 
          onClick={handleDelete} 
          className="p-4 mt-8 bg-black text-yellow-500 rounded-md text-lg w-1/2"
        >
          Delete Account
        </button>
        {isOpen && <DeleteUserDialog email={email} onClose={() => setIsOpen(false)} />}
      </div>
    );
  };
  
  export default DeleteAccount;