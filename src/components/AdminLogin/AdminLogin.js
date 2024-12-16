import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import axios from "axios";

const AdminLogin = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === '' || password === '') {
      setError('Please fill in both fields');
      return;
    }

    setError('');
    axios.post('https://mortgage-backend-476d.onrender.com/admin/login', {
      username: username,
      password: password
    })
    .then((response) => {
      console.log('Login successful:', response.data);
      setSuccess('Logged in Successfully.');
      const { access_token, admin_details } = response.data;
      console.log(response.data.admin_details)
      localStorage.setItem("token", access_token);
      localStorage.setItem("admin_details", JSON.stringify(admin_details));
      navigate("/");
    })
    .catch((error) => {
      console.error('Login error:', error);
      setError('Invalid username or password. Please try again.');
    });
  };

  return (
    <div className="adm-login-container">
      <h2>Admin Login</h2>
      <form className="adm-login-form" onSubmit={handleSubmit}>
        {success && <p style={{ color: 'green' }}>{success}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="adm-form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className="adm-form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="adm-login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
