import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout';

import Register from './pages/Register'; // The registration component
import Login from './pages/Login'; // Login component
import Dashboard from './pages/Dashboard'; // Dashboard component
import HomePage from './pages/HomePage'; // Home page component
import Sidebar from './components/Sidebar'; // Sidebar component

import TenderListingPage from './pages/TenderListingPage'; // Tender Listing page
import TenderDetailPage from './pages/TenderDetailPage'; // Tender Detail page
import ReferralTenderPage from './pages/ReferralTenderPage'; // Referral Tender page for Upload and Listing
import ReferralTenderDetailPage from './pages/ReferralTenderDetailPage'; // New Referral Tender Detail page
import ForumPage from './pages/ForumPage';
import CreateForumPost from './pages/CreateForumPost';
import CollaborationRequestPage from './pages/CollaborationRequestPage';





const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state

  // Function to handle login success
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {/* Conditional rendering of Sidebar based on login status */}
      {isLoggedIn && <Sidebar />}
      <Routes>
        {/* Public pages (Home, Register, Login) */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        
        {/* Protected routes with Layout, visible only after login */}
        {isLoggedIn && (
          <Route path="/" element={<Layout onLogout={handleLogout} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/referrals" element={<ReferralTenderPage />} /> {/* Referral Tender Page for Upload & Listing */}
            <Route path="/tenders" element={<TenderListingPage />} />
            <Route path="/collaboration" element={<CollaborationRequestPage />} />
            <Route path="/tenders/:id" element={<TenderDetailPage />} /> {/* Tender Detail Page */}
            <Route path="/referral-tenders/detail/:id" element={<ReferralTenderDetailPage />} /> {/* Referral Tender Detail */}
            <Route path="/forum/create" element={<CreateForumPost />} />

            
          </Route>
        )}
      </Routes>
    </Router>
  );
};

export default App;
