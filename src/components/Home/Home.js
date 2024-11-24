// Home.js
import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <header className="home-header">
        <h2>Hey {localStorage.getItem("username")}!</h2>
        <h1>Welcome to Our Application!</h1>
        <p>Your one-stop solution for all your needs.</p>
      </header>

      <section className="home-content">
        <div className="home-section">
          <h2>About Us</h2>
          <p>We provide high-quality services and ensure customer satisfaction.</p>
        </div>
        <div className="home-section">
          <h2>Features</h2>
            <span> Feature 1: High Performance</span><br />
            <span>Feature 2: User-friendly Interface</span> <br /> 
            <span>Feature 3: 24/7 Support</span> <br />
        </div>
      </section>

      <footer className="home-footer">
        <p>&copy; 2024 Your Company Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
