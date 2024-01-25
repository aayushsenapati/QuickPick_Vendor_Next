'use client';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Navbar from './components/Navbar';
import Info from './components/Info';
import Carousel from './components/Carousel';


export default function Home() {
 
  const router = useRouter();
  return (
    
    <div>
            <Navbar/>
            <Info/>
            <Carousel/>       
    </div>
  )
}

Home.requireAuth = true
