// src/components/Sidebar.js
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    // Add any logout logic here (clear tokens, etc.)
    navigate('/home');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <h2 className="logo">TendBD</h2>
          {!collapsed && <p className="tagline">Tender Solutions</p>}
        </div>
        <button 
          className="collapse-btn" 
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      <div className="sidebar-content">
        <nav className="sidebar-menu">
          <ul>
            <li className={isActive('/dashboard') ? 'active' : ''}>
              <Link to="/dashboard">
                <span className="icon"></span>
                {!collapsed && <span className="menu-text">Dashboard</span>}
              </Link>
            </li>
            <li className={isActive('/forum') ? 'active' : ''}>
              <Link to="/forum">
                <span className="icon"></span>
                {!collapsed && <span className="menu-text">Community Forum</span>}
              </Link>
            </li>
            <li className={isActive('/referrals') ? 'active' : ''}>
              <Link to="/referrals">
                <span className="icon"></span>
                {!collapsed && <span className="menu-text">Referrals</span>}
              </Link>
            </li>
            <li className={isActive('/tenders') ? 'active' : ''}>
              <Link to="/tenders">
                <span className="icon"></span>
                {!collapsed && <span className="menu-text">Tender Listings</span>}
              </Link>
            </li>
            <li className={isActive('/collaboration') ? 'active' : ''}>
              <Link to="/collaboration">
                <span className="icon"></span>
                {!collapsed && <span className="menu-text">Collaboration</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      
      <div className="sidebar-footer">
        <div className="user-info">
          {!collapsed && (
            <div className="user-details">
              <p className="user-name">Startup</p>
              <p className="user-role">Owner</p>
            </div>
          )}
          <div className="user-avatar">JD</div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <span className="icon"></span>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;