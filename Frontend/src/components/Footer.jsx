import React from 'react';
import '../styles/Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Contact</a>
      </div>
      <p className="footer-copy">© {new Date().getFullYear()} Mindspace. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
