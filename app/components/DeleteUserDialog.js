'use client'
import React, { useState } from 'react';
import {signOut} from 'next-auth/react';

const DeleteUserDialog = ({ email, onClose }) => {
  const [error, setError] = useState(null);

  const deleteUser = () => {
    // Call the API to delete the user
    fetch('/api/deleteuser', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Account deleted successfully');
          onClose();
          signOut();
        } else {
          setError(data.error);
        }
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-md">
        <p>Are you sure you want to delete your account?</p>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-end mt-4">
          <button onClick={deleteUser} className="p-2 bg-red-500 text-white rounded-md mr-2">Yes</button>
          <button onClick={onClose} className="p-2 bg-gray-300 rounded-md">No</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserDialog;