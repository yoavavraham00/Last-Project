import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { FaStar } from 'react-icons/fa'; // Import EiStar icon from React Icons

import { Link } from 'react-router-dom'; // Import Link from React Router
import './Style/NavBarHeader.css';

export function NavBarHeader({ darkMode, toggleDarkMode, isLoggedIn }) {
  const [logedIn, setIsLogedIn] = useState(isLoggedIn);
  const navClass = darkMode ? 'dark-nav' : 'light-nav';
  const darkModeIcon = darkMode ? <FaStar /> : <FaStar />;

  console.log(isLoggedIn);

  return (
  <div>
    <Nav className={`navbar ${navClass}`} justify variant="tabs" defaultActiveKey="/home">
      <Nav.Item >
        <Link to="/" className="nav-link">
          <FaStar />
          <span className="nav-tooltip">Home</span>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/about" className="nav-link">
          <FaStar />
          <span className="nav-tooltip">About Us</span>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/register" className="nav-link">
          <FaStar />
          <span className="nav-tooltip">Registration Page</span>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/cards" className="nav-link">
          <FaStar />
          <span className="nav-tooltip">Our theater</span>
        </Link>
      </Nav.Item>
      { ( // Only show SavedCardsPage link for logged-in users
        <Nav.Item>
          <Link to="/saved-cards" className="nav-link">
            <FaStar />
            <span className="nav-tooltip">Saved Cards</span>
          </Link>
        </Nav.Item>
      )}
      <div className="dark-mode-container">
        <button className="dark-mode-button" onClick={toggleDarkMode}>
          {darkModeIcon}Dark/Light Mode
        </button>
      </div>
      <div className="nav-search">
      <FaStar />
      <input type="text" placeholder="Search Here For Product" className="search-input" />
        <button className="search-button">
        </button>
      </div>
      {isLoggedIn ? (
        // Show Logout link when the user is logged in
        <Nav.Item>
          <Link to="/logout" className="nav-link">
            <FaStar />
            <span className="sign-in">Logout</span>
          </Link>
        </Nav.Item>
      ) : (
        // Show Login link when the user is not logged in
        <Nav.Item>
          <Link to="/login" className="nav-link">
            <FaStar />
            <span className="sign-in">Log in</span>
          </Link>
        </Nav.Item>
      )}
    </Nav>
    </div>
  );
}