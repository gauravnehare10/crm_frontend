import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import useStore from '../../store';
import useMortgageStore from '../../morgageStore';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
    const endpoint = 'https://mortgage-backend-yn59.onrender.com/login';
  
    axios.post(endpoint, {
      username: username.toLowerCase(),
      password: password
    })
    .then((response) => {
      console.log('Login successful:', response.data);
      setSuccess('Logged in Successfully.');
      
    const { access_token, ...details } = response.data;
    localStorage.setItem("token", access_token);
      const { user_details, mortgage } = details;
      updateUserData(user_details);
      updateMortgage(mortgage);
      localStorage.setItem("username", username.toLowerCase());
      navigate("/home");
    })
    .catch((error) => {
      console.error('Login error:', error);
      setError('Invalid username or password. Please try again.');
    });
  };

  return (
    <div className='login-main'>
      <div className="my-content">
        <h2 style={{'color': 'darkgreen'}}><strong><em>AAI Financials</em></strong></h2>
        <p><em>Your trusted partner for tailored mortgage solutions and a stress-free financial journey. Let's achieve your homeownership dreams together!</em></p>
      </div>
      <div className="login-container">
        <h2><strong>Login</strong></h2>
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

          <button type="submit" className="login-button">Login</button>
          <Link to='/forgot-password' style={{margin:'10px 0'}}>Forgot Password?</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
