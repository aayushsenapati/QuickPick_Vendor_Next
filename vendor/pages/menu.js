//import clientPromise from "/lib/mongodb";
import AddRest from "/components/AddRest";
import EditMenu from "/components/EditMenu";
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';

export default function Menu(){
  const router = useRouter();
  const {user, error, isLoading}=useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if(user){
    return(
        <>
          <AddRest/>
          <EditMenu user={user}/>

        </>
    )
    }
    else{
      router.replace('/login')
    }
}