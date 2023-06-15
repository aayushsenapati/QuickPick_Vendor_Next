import '@/styles/globals.css'
import React from 'react';
import { UserProvider} from '@auth0/nextjs-auth0/client';
import Layout from '/components/layout'
import { useRouter } from 'next/router';
import Sidebar from '../components/Sidebar'


export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Don't render the Layout component on the login page
  if (router.pathname === '/login') {
    return (
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    );
  }

  return (
    <UserProvider>
      
        <Sidebar/>
        <Component {...pageProps} />
        
      
    </UserProvider>
  );
}









