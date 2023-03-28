import '@/styles/globals.css'
import React from 'react';
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';
import Layout from '/components/layout'
import { useRouter } from 'next/router';


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
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}









