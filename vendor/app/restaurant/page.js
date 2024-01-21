'use client';
import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Restaurant() {
    const session = useSession({
        required: true,
        onUnauthenticated() {
          redirect('/');
        },
    });
    return(
        <div>
            <div className="p-8">
                <div className='text-white'>{session?.data?.user?.email }</div>
                <button className='text-white' onClick={() => signOut()}>Logout</button>
            </div>
            
        </div>
    )

}
