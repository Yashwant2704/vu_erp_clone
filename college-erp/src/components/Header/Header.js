// src/components/Header/Header.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import './Header.css';
import logo from '../../assets/512x512.png'; // Make sure to have a logo image in the assets folder

const Header = () => {
  const navigate = useNavigate();

  const handleReload = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="header">
      <div className="app-bar">
        <img src={logo} alt="Logo" className="logo" onClick={handleGoHome} />
        <div className="app-bar-actions">
          <button onClick={handleGoHome}>Home</button>
          <button onClick={handleReload}>Reload</button>
        </div>
      </div>
      <Breadcrumbs />
    </div>
  );
};

export default Header;
