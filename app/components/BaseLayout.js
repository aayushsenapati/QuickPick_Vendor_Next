"use client";
import React from "react";
import Sidebar from './sidebar';


export default function BaseLayout({ children }) {
    return (
      <div className="h-screen flex flex-row justify-start">
        <Sidebar />
        <div className="flex-1 overflow-y-auto ml-1/5">
          {children}
        </div>
      </div>
    );
  }
