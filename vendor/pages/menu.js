import { useState } from 'react';
import Modal from 'react-modal';
import AddRest from "/components/AddRest";
import EditMenu from "/components/EditMenu";
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';

Modal.setAppElement('#__next') // replace with your app's id

export default function Menu(){
  const router = useRouter();
  const {user, error, isLoading}=useUser();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if(user){
    return(
        <div className="flex flex-col items-center justify-center min-h-screen">
          <button onClick={() => setModalIsOpen(true)} className="bg-blue-500 text-white p-2 rounded-md">Add Restaurant</button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            contentLabel="Add Restaurant Modal"
            className="flex items-center justify-center outline-none"
          >
            <AddRest/>
          </Modal>
          <EditMenu user={user}/>
        </div>
    )
  } else {
    router.replace('/login')
  }
}