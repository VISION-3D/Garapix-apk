import React from 'react';
import { Outlet } from 'react-router-dom';
import '../styles/dashboard.css';
import BottomNav from './BottomNav';
export default function DashboardLayout() {
  return (
    <div className="dashboard">
     
      <BottomNav/>
      <div className="main-area">

        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}