import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About the App */}
        <div className="footer-section">
          <h4>Banking App</h4>
          <p>
            A secure and user-friendly platform for managing your finances. 
            Experience hassle-free banking services at your fingertips.
          </p>
        </div>

        {/* Contact Information */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: support@bankingapp.com</p>
          <p>Phone: +1 123 456 7890</p>
          <p>Address: 123 Finance Street, Banking City, 45678</p>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-copyright">
        <p>© {new Date().getFullYear()} Banking App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
