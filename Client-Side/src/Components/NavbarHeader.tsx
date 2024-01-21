import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { FiMoon, FiSun, FiSearch, FiTruck } from 'react-icons/fi';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './NavBarHeader.css';


export function NavBarHeader({ darkMode, toggleDarkMode, isLoggedIn }) {
  const [logedIn, setIsLogedIn] = useState(isLoggedIn);
  const navClass = darkMode ? 'dark-nav' : 'light-nav';
  const darkModeIcon = darkMode ? <FiSun /> : <FiMoon />;

  console.log(isLoggedIn);

  return (
    <Nav className={`navbar ${navClass}`} justify variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Link to="/home" className="nav-link">
          <FiTruck />
          <span className="nav-tooltip">Home</span>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/about" className="nav-link">
          <FiTruck />
          <span className="nav-tooltip">About Us</span>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/registration" className="nav-link">
          <FiTruck />
          <span className="nav-tooltip">Registration</span>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/cards" className="nav-link">
          <FiTruck />
          <span className="nav-tooltip">Our Cards </span>
        </Link>
      </Nav.Item>
      { ( // Only show SavedCardsPage link for logged-in users
        <Nav.Item>
          <Link to="/saved-cards" className="nav-link">
            <FiTruck />
            <span className="nav-tooltip">Saved Cards</span>
          </Link>
        </Nav.Item>
      )}
      <div className="dark-mode-container">
        <button className="dark-mode-button" onClick={toggleDarkMode}>
          {darkModeIcon}
        </button>
      </div>
      <div className="nav-search">
        <input type="text" placeholder="Search For Cars" className="search-input" />
        <button className="search-button">
          <FiSearch />
        </button>
      </div>
      {isLoggedIn ? (
        // Show Logout link when the user is logged in
        <Nav.Item>
          <Link to="/logout" className="nav-link">
            <FiTruck />
            <span className="sign-in">Logout</span>
          </Link>
        </Nav.Item>
      ) : (
        // Show Login link when the user is not logged in
        <Nav.Item>
          <Link to="/login" className="nav-link">
            <FiTruck />
            <span className="sign-in">Log in</span>
          </Link>
        </Nav.Item>
      )}
    </Nav>
  );
}