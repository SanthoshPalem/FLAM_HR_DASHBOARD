import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Darkmode from '../Darkmode/Darkmode'; // ✅ Importing the Darkmode component

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-title">HR Dashboard</Link>
      
      <div className="navbar-links">
        <Link to="/search" className="navbar-link">Search</Link>
        <Link to="/bookmarks" className="navbar-link">Bookmarks</Link>
        <Link to="/promoted" className="navbar-link">Promoted</Link>
        <Link to="/analytics" className="navbar-link">Analytics</Link>
      </div>

      {/* ✅ Dark mode toggle component placed here */}
      <Darkmode />
    </nav>
  );
};

export default Navbar;
