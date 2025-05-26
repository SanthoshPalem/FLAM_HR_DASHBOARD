import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-title">HR Dashboard</Link>
      
      <div className="navbar-links">
        <Link to="/search" className="navbar-link">Search</Link>
        <Link to="/bookmarks" className="navbar-link">Bookmarks</Link>
        <Link to="/promoted" className="navbar-link">Promoted</Link>
        <Link to="/analytics" className="navbar-link">Analytics</Link>

        {/* <button
          onClick={() => setDarkMode(prev => !prev)}
          className="dark-mode-toggle"
          aria-label="Toggle dark mode"
          style={{ marginLeft: '1rem', padding: '0.25rem 0.5rem' }}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button> */}
      </div>
    </nav>
  );
};

export default Navbar;
