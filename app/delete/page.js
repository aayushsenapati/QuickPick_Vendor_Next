'use client'

import React, { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import DeleteUserDialog from '../components/DeleteUserDialog';

const DeleteAccount = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  const handleDelete = () => {
    console.log(session.user.email);
    setIsOpen(true);

  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    await signIn('google');
    setLoading(false);
  };

  const handleSignOut = () => {
    signOut();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-yellow-500">
      {status === 'unauthenticated' && (
        <button 
          onClick={handleGoogleSignIn} 
          className="p-4 mt-8 bg-black text-yellow-500 rounded-md text-lg w-1/2"
        >
          Sign In with Google
        </button>
      )}
      {status === 'authenticated' && (
        <>
          <h1 className="text-4xl text-white">{session.user.email}</h1>
          <button 
            onClick={handleSignOut} 
            className="p-4 mt-8 bg-black text-yellow-500 rounded-md text-lg w-1/2"
          >
            Sign Out
          </button>
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