import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDash.css';

const AdminDash = () => {
  const navigate = useNavigate();
  const [adminDetails, setAdminDetails] = useState(null);

  useEffect(() => {
    // Check if the admin is logged in by looking for a token or a flag in localStorage
    const isLoggedIn = localStorage.getItem('admin_details');
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      // Parse the stored admin details and set state
      setAdminDetails(JSON.parse(isLoggedIn));
    }
  }, [navigate]);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Admin Panel</h1>
      </header>
      <main className="home-main">
        <section className="overview">
          <h2>Overview</h2>
          {adminDetails ? (
            <div className="admin-details">
              <h3>Welcome, {adminDetails.name}!</h3>
              <p>Email: {adminDetails.email}</p>
              <p>Contact: {adminDetails.contactnumber}</p>
            </div>
          ) : (
            <p>Loading admin details...</p>
          )}
          <div className="stats">
            <div className="stat-item">
              <h3>120</h3>
              <p>Active Users</p>
            </div>
            <div className="stat-item">
              <h3>45</h3>
              <p>Pending Requests</p>
            </div>
            <div className="stat-item">
              <h3>10</h3>
              <p>System Alerts</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDash;
