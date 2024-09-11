import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import logo from '../../src/assets/512x512.png';
import SplashScreen from './SplashScreen';
import './Login.css';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('https://react-erp-1.onrender.com/login', { username, password });
      // const response = await axios.post('http://localhost:5000/login', { username, password });

      if (response.data.message === 'Login successful') {
        onLogin(username, password);

        setTimeout(() => {
          setShowSplash(true);
        }, 1000);

        setShowSnackbar(true);

        setTimeout(() => {
          setShowSplash(false);
          setShowSnackbar(false);
          navigate('/');
        }, 4000);
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError('An error occurred during login. Please try again.');
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSnackbar(false);
  };

  return (
    <>
      <div className="login-logo-container">
        <img src={logo} alt="Logo" className="login-logo" />
      </div>
      <div className={`login-container ${showSplash ? 'fade-out' : ''}`}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={username.trim() === '' || password.trim() === ''}>
            Login
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>

        <Snackbar
          open={showSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <MuiAlert onClose={handleCloseSnackbar} severity={error ? 'error' : 'success'} sx={{ width: '100%' }}>
            {error ? error : 'Login successful!'}
          </MuiAlert>
        </Snackbar>
      </div>

      {showSplash && <SplashScreen />}
    </>
  );
};

export default Login;
