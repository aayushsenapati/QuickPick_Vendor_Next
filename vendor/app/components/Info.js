// //tagline,signin login buttons
// 'use client';

// import { useRouter } from 'next/navigation';
// import React from 'react';
// import Image from 'next/image';

// const About = () => {
//   const router = useRouter();
//   return (
//     <div>
//       <div className='flex flex-row justify-center'>
//               <div className="flex flex-col items-center justify-center  bg-white-100 pl-32">
//                 <h1 className="text-6xl font-bold text-black-500 pl-8">QuickPick</h1>
//                 <p className="text-2xl text-black-700 mt-4">Your food, your pick, super quick</p>
//                 <div className="flex mt-4 items-center justify-center pl-8 pr-8 pb-8 pt-4">
//                   <button
//                     onClick={() => router.push('signin')}
//                     className="bg-yellow-400 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded-full mr-4"
//                   >
//                     Sign in
//                   </button>

//                   <button
//                     onClick={() => router.push('signup')}
//                     className="bg-white-100 hover:bg-gray-200 text-black font-bold py-2 px-4 rounded-full border border-black"
//                   >
//                     Sign up
//                   </button>
//                 </div>
//               </div>

//               <div className="flex items-end justify-center pl-64">
//                 <Image
//                   src="/landing_img_nobg.png"
//                   alt="landing_img"
//                   width={700}
//                   height={700}
//                   className="mx-auto"
//                 />
//               </div>
//       </div>
//     </div>
//   )
// }

// export default About

//tagline, signin login buttons
'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import Image from 'next/image';

const Info = () => {
  const router = useRouter();
  return (
    <div className='flex flex-row'>
      {/* Left side - Text and Buttons */}
      <div className="flex flex-col items-center justify-center bg-white-100 pl-32 ml-8">
        <h1 className="text-6xl font-bold text-black-500">QuickPick</h1>
        <p className="text-2xl text-black-700 mt-4">Your food, your pick, super quick</p>
        <div className="flex mt-4 items-center justify-center">
          <button
            onClick={() => router.push('signin')}
            className="bg-yellow-400 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded-full mr-4"
          >
            Sign in
          </button>
          <button
            onClick={() => router.push('signup')}
            className="bg-white-100 hover:bg-gray-200 text-black font-bold py-2 px-4 rounded-full border border-black"
          >
            Sign up
          </button>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="flex items-end justify-end flex-grow ">
        <div className="max-w-full">
          <Image
            src="/landing_img_nobg.png"
            alt="landing_img"
            width={525}
            height={525}
            className="mx-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default Info;
