import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { VscThreeBars } from "react-icons/vsc";
import './index.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="brand-title">Jobfly</div>
      <button className="toggle-button" onClick={handleToggle}>
            <VscThreeBars className='bar' />
      </button>
      <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/jobs">Jobs</Link></li>
          <li>Book</li>
        </ul>
      </div>
      <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={closeMenu}></div>
    </nav>
  );
};

export default NavBar;