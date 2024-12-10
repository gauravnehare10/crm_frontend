import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAppStore from '../../store';

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { updateUserData } = useAppStore();

  const validateInputs = () => {
    if (name.trim() === '') {
      setError('Name is required.');
      return false;
    }
    if (username.trim() === '' || username.length < 3) {
      setError('Username must be at least 3 characters long.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    const contactRegex = /^[0-9]{10}$/;
    if (!contactRegex.test(contactNumber)) {
      setError('Contact number must be a valid 10-digit number.');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate inputs
    if (!validateInputs()) {
      return;
    }

    axios
      .post('http://127.0.0.1:8000/register', {
        name: name,
        username: username,
        password: password,
        email: email,
        contactnumber: contactNumber,
      })
      .then((response) => {
        console.log('Registration successful:', response.data);
        setSuccess('Registration successful!');
        updateUserData({
          name: name,
          username: username.toLowerCase(),
          email: email,
          contactnumber: contactNumber,
        });
        localStorage.setItem('username', username.toLowerCase());
        navigate('/home');
      })
      .catch((error) => {
        console.error('Registration error:', error);
        if (error.response && error.response.data.detail) {
          if (error.response.data.detail === 'Username already exists.') {
            window.alert('Username already exists. Please choose another username.');
          } else if (error.response.data.detail === 'Email already exists.') {
            window.alert('Email already exists. Please use a different email.');
          } else {
            setError(error.response.data.detail);
          }
        } else {
          setError('Something went wrong. Please try again.');
        }
      });
  };

  return (
    <div className='register-main'>
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="register-form">
          {error && <p className="error-message">{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="text"
              id="contactNumber"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
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

          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
