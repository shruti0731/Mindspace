import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => (
  <header className="header">
    <div className="header-logo">MindSpace</div>
    <nav className="nav-links">
      <Link to="/">Home</Link>
      <Link to="/about">About Us</Link>
      <Link to="/contact">Contact Us</Link>
      <Link to="/login">Login</Link>
    </nav>
  </header>
);

export default Header;
