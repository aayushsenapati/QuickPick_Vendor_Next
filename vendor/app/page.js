'use client';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Navbar from './components/Navbar';
import Info from './components/Info';
import Carousel from './components/Carousel';
import Contactus from './components/Contactus';


export default function Home() {
  
 
  const router = useRouter();
  
  const scrollToCarousel = () => {
    const carouselElement = document.getElementById('carousel-section');
    if (carouselElement) {
      carouselElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const carouselElement = document.getElementById('contact-section');
    if (carouselElement) {
      carouselElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    
    <div>
      <Navbar onAboutClick={scrollToCarousel} onContactClick={scrollToContact}/>
      <Info />
      <Carousel />
      <Contactus/>
    </div>
  )
}

Home.requireAuth = true
