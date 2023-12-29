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
          
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            contentLabel="Add Restaurant Modal"
            style={{
              overlay: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
              content: {
                position: 'relative',
                top: 'auto',
                left: 'auto',
                right: 'auto',
                bottom: 'auto',
              },
            }}
          >
            <AddRest/>
          </Modal>
          <EditMenu user={user}/>
          <button onClick={() => setModalIsOpen(true)} className="bg-blue-500 text-white p-2 rounded-md mt-4">Add Restaurant</button>
        </div>
    )
  } else {
    router.replace('/login')
  }
}