//tagline,signin login buttons
'use client';

import { useRouter } from 'next/navigation';
import React from 'react'

const About = () => {
const router = useRouter();
  return (
    <div>
      about
      <h1>QuickPick</h1>
            <button
                onClick={() => router.push('signin')} 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Sign in
            </button>
            <button
                onClick={() => router.push('signup')} 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Sign up
            </button>
    </div>
  )
}

export default About
