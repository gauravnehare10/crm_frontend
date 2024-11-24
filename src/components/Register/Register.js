// Register.js
import React, { useState } from 'react';
import './Register.css'; // Import CSS for styling (optional)
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    axios.post('http://127.0.0.1:8000/register', {
      name: name,
      username: username,
      password: password,
      email: email,
      contactnumber: contactNumber
    })
    .then((response) => {
      console.log('Registration successful:', response.data);
      alert('Registration successful! You can now log in.')
      setSuccess('Registration successful! You can now log in.');
      setName('');
      setUsername('');
      setEmail('');
      setPassword('');
      setContactNumber('')
      navigate('/login')
    })
    .catch((error) => {
      console.error('Registration error:', error);
      if (error.response && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('Something went wrong. Please try again.');
      }
    });
  };

  return (
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
            id="contactNumber"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
};

export default Register;