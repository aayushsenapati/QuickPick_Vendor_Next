import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import {useEffect} from 'react'


const inter = Inter({ subsets: ['latin'] })



export default function Home() {
  const {user, error, isLoading}=useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  console.log(user.email);
  
  console.log(user)
  const router = useRouter();
  if(user){
    return (
      <>
        <Link href="/orders">Orders</Link>
      </>
    )
  }
  else{
    router.replace('/login')
  }
  

}
