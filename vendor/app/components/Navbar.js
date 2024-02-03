import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { NAV_LINKS } from '@/constants';

const Navbar = ({ onAboutClick, onContactClick }) => {
  const router = useRouter();

  return (
    <div className='fixed top-0 left-0 right-0 z-30 hover:bg-white'>
    <nav className='flexBetween max-container padding-container relative z-30 py-4 flex '>
      <div onClick={() => router.push('/')}>
        <Image src='/quickpick_horizontal_logo_black.png' alt="logo" width={130} height={90} className='ml-10'/>
      </div>
      <ul className='hidden h-full gap-12 lg:flex ml-auto mr-10'>
        {/* {NAV_LINKS.map((link) => (
          <li key={link.key} className='regular-16 text-gray-55 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold' onClick={() => router.push(link.href)}>
            {link.label}
          </li> */}
          <li className='regular-16 text-gray-55 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold' onClick={() => router.push('/')}>Home</li>
          <li className='regular-16 text-gray-55 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold' onClick={onAboutClick}>About</li>
          <li className='regular-16 text-gray-55 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold' onClick={onContactClick}>Contact Us</li>
        {/* ))} */}
      </ul>
    </nav>
    </div>
  );
}

export default Navbar;


