import Link from 'next/link'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import axios from "axios";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  const {user, error, isLoading}=useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if(user){
    axios.get('/api/newClient/'+user.email)
    .then(()=>{console.log("success creating")},()=>{console.log("There was an error in api/newClient")})

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-6xl font-bold text-blue-500">QuickPick</h1>
        <p className="text-2xl text-gray-700 mt-4">Your food, your pick, super quick</p>
      </div>
    )
  }
  else{
    router.replace('/login')
  }
}