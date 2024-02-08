import { MdSpaceDashboard } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { BsClipboard2Minus } from "react-icons/bs";
import { IoRestaurantOutline } from "react-icons/io5";

// NAVIGATION
export const NAV_LINKS = [
    { href: '/', key: 'home', label: 'Home' },
    { href: '/about', key: 'about', label: 'About' },
    { href: '/', key: 'contact_us', label: 'Contact Us' },
    { href: '/', key: 'policy', label: 'Policy' },
  ];

export const sidebarItems = [
    // { 
    //   href: '/',
    //   name: 'Home',
    //   icon: AiOutlineHome,
    // },
    // {
    //    href: '/about',
    //    name: 'About',
    //    icon: BsPeople ,
    // },
    {
      href:'/orders',
      name:'Orders',
      icon: BsClipboard2Minus,
    },
    {
      href:'/restaurant',
      name:'Edit Restaurant Items',
      icon: IoRestaurantOutline,
    }

  ];
