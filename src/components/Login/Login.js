import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === '' || password === '') {
      setError('Please fill in both fields');
      return;
    }

    setError('');
    axios.post('http://127.0.0.1:8000/login', {
      username: username,
      password: password
    })
    .then((response) => {
      console.log('Login successful:', response.data);
      setSuccess('Logged in Successfully.');
      localStorage.setItem("username", username);
      navigate("/home");
    })
    .catch((error) => {
      console.error('Login error:', error);
      setError('Invalid username or password. Please try again.');
    });
  };
  return (
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

        <button type="submit" className="login-button">Login</button>
        <button type="button" className="register-button"
        onClick={()=>{
          navigate("/register")
        }
        }>Register</button>
      </form>
    </div>
  );
};

export default Login;
