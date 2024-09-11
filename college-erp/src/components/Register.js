// src/components/Register/Register.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css'; // Import the CSS file for Register component

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://react-erp-1.onrender.com/register', {
        // const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, confirmPassword }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        // Registration successful, redirect to login page
        window.location.href = '/login';
      }
    } catch (error) {
      setError('Error registering');
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
        </div>
        <button type="submit">Register</button>
      </form>
      {error && <div className="error-message">{error}</div>}
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Register;
