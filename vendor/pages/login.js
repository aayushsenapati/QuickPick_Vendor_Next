import Link from 'next/link';
import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const LoginButton = () => {
    const { user, error: userError } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push('/orders');
        }
    }, [user]);
    console.log('in loginx`')
    const handleLogin = async () => {
        window.location.href = '/api/auth/login'

    }

    return (
        <>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto mt-4 block shadow-lg" onClick={handleLogin}>
                login
            </button>

        </>

    );
};

export default LoginButton;