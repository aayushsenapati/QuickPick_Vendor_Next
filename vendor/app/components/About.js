//tagline,signin login buttons
'use client';

import { useRouter } from 'next/navigation';
import React from 'react'

const About = () => {
const router = useRouter();
  return (
    <div>
      
      <div className="flex flex-col items-start justify-center min-h-screen bg-white-100 pl-32">
        <h1 className="text-6xl font-bold text-black-500 pl-8">QuickPick</h1>
        <p className="text-2xl text-black-700 mt-4">Your food, your pick, super quick</p>
        <div className="flex mt-4 items-center justify-center pl-8 pr-8 pb-8 pt-4">
            <button
                onClick={() => router.push('signin')} 
                className="bg-yellow-400 hover:bg-yellow-700 text-black font-bold py-2 px-8 rounded-full mr-4"
            >
                Sign in
            </button>
            
            <button
                onClick={() => router.push('signup')} 
                className="bg-white-100 hover:bg-gray-200 text-black font-bold py-2 px-8 rounded-full border border-black"
            >
                Sign up
            </button>
        </div>
      </div>
    </div>
  )
}

export default About
