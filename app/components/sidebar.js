'use client';
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import classNames from "classnames";
import { BsClipboard2Minus } from "react-icons/bs";
import { IoRestaurantOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { useUser } from "@auth0/nextjs-auth0/client";

export const menuItems = [
  {
    id: 1,
    label: 'Orders',
    icon: BsClipboard2Minus,
    link: '/orders',
  },
  {
    id: 2,
    label: 'Edit Restaurant Items',
    icon: IoRestaurantOutline,
    link: '/restaurant',
  }
];

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const router = useRouter();

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === router.pathname),
    [router.pathname]
  );

  const wrapperClasses = classNames(
    "px-4 pt-8 pb-7 w-1/5 bg-primary bg-black text-white flex justify-between flex-col  inline-block h-screen",
    {
      ["w-1/5"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    }
  );

  const getNavItemClasses = (menu) => {
    let classes = classNames(
      "flex items-center cursor-pointer hover:bg-secondary rounded w-full overflow-hidden whitespace-nowrap"
    );

    if (activeMenu && activeMenu.id === menu.id) {
      // classes += " bg-secondary text-black";
    }
    if (menu.id === 2) {
      classes += " max-h-screen overflow-y-auto";
    }

    return classes;
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const collapseIconClasses = classNames(
    "p-4 rounded bg-light-lighter absolute right-0 bottom-5",
    {
      "rotate-180": toggleCollapse,
    }
  );

  return (
    <div className={wrapperClasses} style={{ transition: "width 800ms cubic-bezier(0.4,0,0,1) 0s" }}>
      <div className="">
        <div className="flex item-center pl-1">
          <Image src="/quickpick_bell_icon.png" width={80} height={80} className="sidebar__logo" alt="logo" />
          <span className={classNames("mt-6 text-2xl font-medium text-white", { hidden: toggleCollapse })}>
            QuickPick
          </span>
        </div>
        <div className=" items-start mt-24">
          {menuItems.map(({ icon: Icon, ...menu }) => {
            const classes = getNavItemClasses(menu);
            return (
              <div className={classes} key={menu.id}>
                <Link href={menu.link} className="py-4 px-4 items-center w-full h-full">
                  <div className="flex">
                    <div className='pt-1 mr-4'>
                      {/* Increase the icon size by adjusting the width and height */}
                      <Icon size={24} /> {/* Change the size to your desired value */}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <span className={classNames("text-xl", { hidden: toggleCollapse })}>
                          {menu.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-secondary flex items-center justify-between relative">
        {isCollapsible && (
          <button
            className={collapseIconClasses}
            onClick={() => {
              setToggleCollapse(!toggleCollapse);
            }}
          >
            <IoIosArrowBack />
          </button>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
