import Link from 'next/link';
import { useState } from 'react';

const LoginButton = () => {
    console.log('in loginx`')
    const handleLogin = async () => {
        window.location.href = '/api/auth/login'

    }

    return (
        <>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogin}>
                login
            </button>

        </>

    );
};

export default LoginButton;