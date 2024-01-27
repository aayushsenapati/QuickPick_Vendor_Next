"use client";
import React, { createContext, useState } from 'react';

const initialValue = {
    iscollapsedSidebar: false,
    toggleSidebarCollapseHandler: () => { },
};

export const SidebarContext = createContext(initialValue);

const SidebarProvider = ({ children }) => {
    const [iscollapsedSidebar, setiscollapsedSidebar] = useState(false);

    const toggleSidebarCollapseHandler = () => {
        setiscollapsedSidebar((prev) => !prev);
    };

    return (
        <SidebarContext.Provider value={{ iscollapsedSidebar, toggleSidebarCollapseHandler }}>
            {children}
        </SidebarContext.Provider>
    );
};

export default SidebarProvider;
