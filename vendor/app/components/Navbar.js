import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { NAV_LINKS } from '@/constants';

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className='flexBetween max-container padding-container relative z-30 py-5 flex'>
      <div onClick={() => router.push('/')}>
        <Image src='/qp_logo_nobg.png' alt="logo" width={110} height={100} className='ml-10'/>
      </div>
      <ul className='hidden h-full gap-12 lg:flex ml-auto mr-10'>
        {NAV_LINKS.map((link) => (
          <li key={link.key} className='regular-16 text-gray-55 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold' onClick={() => router.push(link.href)}>
            {link.label}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;


