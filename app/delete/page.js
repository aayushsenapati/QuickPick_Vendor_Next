'use client'

import React, { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import DeleteUserDialog from '../components/DeleteUserDialog';

const DeleteAccount = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    signOut({ redirect: false }); // Sign out on first load
  }, []); // Empty dependency array ensures this runs only once

  const handleDelete = () => {
    console.log(session.user.email); // Log the email
    setIsOpen(true);
  };

  const handleGoogleSignIn = () => {
    signIn('google');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-yellow-500">
      {!session && (
        <button 
          onClick={handleGoogleSignIn} 
          className="p-4 mt-8 bg-black text-yellow-500 rounded-md text-lg w-1/2"
        >
          Sign In with Google
        </button>
      )}
      {session && (
        <>
          <button 
            onClick={handleDelete} 
            className="p-4 mt-8 bg-black text-yellow-500 rounded-md text-lg w-1/2"
          >
            Delete Account
          </button>
          {isOpen && <DeleteUserDialog email={session.user.email} onClose={() => setIsOpen(false)} />}
        </>
      )}
    </div>
  );
};

export default DeleteAccount;