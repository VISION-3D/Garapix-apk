// src/components/Layout.jsx
import React from 'react';
import SidebarNav from './SidebarNav';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <>
      <SidebarNav />
      <main className="main-content">
        {children}
      </main>
    </>
  );
};

export default Layout;