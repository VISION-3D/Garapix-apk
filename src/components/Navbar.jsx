// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaCamera,
  FaBook,
  FaBars,
  FaTimes,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import { useUser } from '../context/UserContext';
import './Navbar.css';

import syncService from '../services/syncService';

const SyncIndicator = () => {
  const [syncStatus, setSyncStatus] = useState(syncService.getSyncStatus());

  useEffect(() => {
    const interval = setInterval(() => {
      setSyncStatus(syncService.getSyncStatus());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!syncStatus.isOnline) {
    return (
      <div className="sync-indicator offline">
        📴 Hors ligne
      </div>
    );
  }
   return (
    <div className="sync-indicator online">
      ✅ Synchronisé
    </div>
  );
};

const Navbar = ({ onToggleCollapse, isCollapsed }) => {
  const { user } = useUser();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { path: '/', icon: <FaCamera />, label: 'Diagnostique' },
    { path: '/library', icon: <FaBook />, label: 'Bibliothèque' }
  ];

  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);
  const closeMobileMenu = () => setIsMobileOpen(false);

  return (
    <>
      {/* Mobile button */}
      <button
        className="mobile-menu-toggle"
        onClick={toggleMobileMenu}
      >
        {isMobileOpen ? <FaTimes /> : <FaBars />}
      </button>

      {isMobileOpen && (
        <div className="mobile-overlay" onClick={closeMobileMenu} />
      )}

      <aside className={`navbar ${isMobileOpen ? 'mobile-open' : ''} ${isCollapsed ? 'collapsed' : ''}`}>

        {/* Collapse button */}
        <button className="collapse-toggle" onClick={onToggleCollapse}>
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>

      
        {/* Menu */}
        <div className="nav-menu">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'active' : ''}`
              }
              onClick={closeMobileMenu}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          ))}
        </div>

        <SyncIndicator />

      </aside>
    </>
  );
};

export default Navbar;
