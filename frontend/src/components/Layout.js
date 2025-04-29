// src/components/Layout.js
import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom'; // To render the nested routes

const Layout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '250px', padding: '20px' }}>
        <Outlet /> {/* Render the current route's component here */}
      </div>
    </div>
  );
};

export default Layout;
