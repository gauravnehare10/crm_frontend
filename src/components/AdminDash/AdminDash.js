import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDash.css';

const AdminDash = () => {
  const navigate = useNavigate();
  const [adminDetails, setAdminDetails] = useState(null);
  const [stats, setStats] = useState({
    total_count: 0,
    has_mortgage_count: 0,
    is_looking_for_mortgage_count: 0,
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('admin_details');
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      setAdminDetails(JSON.parse(isLoggedIn));
    }

    const fetchCounts = async () => {
      try {
        const response = await fetch('http://localhost:8000/counts'); // Replace with your FastAPI endpoint URL
        if (response.ok) {
          const data = await response.json();
          setStats({
            total_count: data.total_count,
            has_mortgage_count: data.has_mortgage_count,
            is_looking_for_mortgage_count: data.is_looking_for_mortgage_count,
          });
        } else {
          console.error('Failed to fetch counts:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
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
              <h3>{stats.total_count}</h3>
              <p>All Clients</p>
            </div>
            <div className="stat-item">
              <h3>{stats.has_mortgage_count}</h3>
              <p>Has Mortgage</p>
            </div>
            <div className="stat-item">
              <h3>{stats.is_looking_for_mortgage_count}</h3>
              <p>Looking for Mortgage</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDash;
