import Link from 'next/link';
import { useState } from 'react';

const LoginButton = () => {

    const handleLogin = async () => {
        window.location.href='/api/auth/login'
    }

    return (
            <button
                className="bg-blue text-white font-bold py-2 px-4 rounded-full focus:outline-none hover:bg-blue-dark hover:text-white"
                onClick={handleLogin}
            >
                login
            </button>
        
    );
};

export default LoginButton;