"use client";
import React, { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdArrowBackIos } from "react-icons/md";
import { sidebarItems } from '@/constants';
import { SidebarContext } from './SidebarContext';

const Sidebar = () => {

  const { iscollapsedSidebar, toggleSidebarCollapseHandler } = useContext(SidebarContext);

  return (
    <div className='relative'>
      <button className='sidebar_btn' onClick={toggleSidebarCollapseHandler}><MdArrowBackIos /></button>
      <aside className='sidebar' data-collapse={iscollapsedSidebar}>
        <div className='sidebar__top'>
          <Image src="/quickpick_bell_icon_black_solid.png" width={80} height={80} className="sidebar__logo" alt="logo" />
          <div className="sidebar__text-container">
            <div style={{ marginBottom: '4px' }}>
              <p className='sidebar__logo-name'>QuickPick</p>
            </div>
            {/* API CALL to fetch restaurant name i.e Hello Cantina ! */}
            <div>
              <p className='sidebar__restaurant-name'>Hello Restaurant!</p>
            </div>
          </div>
        </div>
        <ul className='sidebar__list'>
          {sidebarItems.map(({ name, href, icon: Icon }) => (
            <li className='sidebar__item' key={name}>
              <Link href={href}>
                <div className='sidebar__link' onClick={(e) => e.stopPropagation()}>
                  <button className='sidebar__icon'>
                    <Icon />
                  </button>
                  <span className='sidebar__name'>{name}</span>
                </div>
              </Link>
            </li>
          ))}

        </ul>
      </aside>

    </div>
  )
}

export default Sidebar;
