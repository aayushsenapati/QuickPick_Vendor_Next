"use client";
import React from "react";
import Sidebar from './sidebar';
import SidebarProvider from "./SidebarContext";


export default function BaseLayout({ children }) {
    return (
        <SidebarProvider>
            <div className="flex h-screen">
                <Sidebar/>{children}
            </div>
        </SidebarProvider>
    );
}
