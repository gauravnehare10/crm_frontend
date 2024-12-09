import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import useStore from '../../store';
import useMortgageStore from '../../morgageStore';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // Toggle for admin/user login
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { updateUserData } = useStore();
  const { updateMortgage } = useMortgageStore();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === '' || password === '') {
      setError('Please fill in both fields');
      return;
    }
  
    setError('');
    const endpoint = isAdmin ? 'https://mortgage-backend-jo6l.onrender.com/admin/login' : 'https://mortgage-backend-jo6l.onrender.com/login';
  
    axios.post(endpoint, {
      username: username.toLowerCase(), // Normalize username to lowercase
      password: password
    })
    .then((response) => {
      console.log('Login successful:', response.data);
      setSuccess('Logged in Successfully.');
      
      const { access_token, ...details } = response.data;
      localStorage.setItem("token", access_token);
  
      if (isAdmin) {
        const { admin_details } = details;
        localStorage.setItem("admin_details", JSON.stringify(admin_details));
        navigate("/admindash");
      } else {
        const { user_details, mortgage } = details;
        updateUserData(user_details);
        updateMortgage(mortgage);
        localStorage.setItem("username", username.toLowerCase());
        navigate("/home");
      }
    })
    .catch((error) => {
      console.error('Login error:', error);
      setError('Invalid username or password. Please try again.');
    });
  };

  return (
    <div className='login-main'>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          {error && <p className="error-message">{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              Login as Admin
            </label>
          </div>

          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
