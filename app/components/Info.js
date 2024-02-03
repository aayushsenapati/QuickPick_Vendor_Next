'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import Image from 'next/image';

const Info = () => {
  const router = useRouter();
  return (
    <div id="home-section" className='flex flex-row h-screen items-center justify-center pt-2 mb-32'>
      {/* Left side - Text and Buttons */}
      <div className="flex flex-col items-center justify-center ml-8 pl-32">
        <h1 className="text-7xl font-bold text-black-500">QuickPick</h1>
        <h1 className="text-4xl font-semibold text-black-500 pt-4">For the Vendor</h1>
        <p className="text-2xl text-black-700 text-center mt-4 pb-8">Your food, your pick, super quick</p>
        <div className="flex mt-4 items-center justify-center">
          <button
            onClick={() => router.push('signin')}
            className="bg-yellow-400 hover:bg-yellow-700 text-black font-bold py-4 px-8 rounded-full mr-4"
          >
            Sign in
          </button>
          <button
            onClick={() => router.push('signup')}
            className="bg-white-100 hover:bg-gray-200 text-black font-bold py-4 px-8 rounded-full border border-black"
          >
            Sign up
          </button>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="flex items-center justify-end">
        <div className="max-w-full">
          <Image
            src="/landing.png"
            alt="landing_img"
            width={900}
            height={900}
            className="mx-auto"
          />

        </div>
      </div>
    </div>
  );
}

export default Info;