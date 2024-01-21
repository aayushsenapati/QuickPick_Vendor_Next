'use client';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Navbar from './components/Navbar';
import About from './components/About';
import Bgimage from './components/Bgimage';

export default function Home() {
 
  const router = useRouter();
  return (
    
    <div>
            <Navbar/>
            <About/>
            <Bgimage/>
            {/* <h1>QuickPick</h1>
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
            </button> */}
            
    </div>
  )
}

Home.requireAuth = true
