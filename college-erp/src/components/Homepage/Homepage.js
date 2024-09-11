import React from 'react';
import { Link } from 'react-router-dom';
import accountsLogo from '../../assets/accounts-logo.png';
import certificateLogo from '../../assets/certificate-logo.png';
import examinationLogo from '../../assets/examination-logo.png';
import subjectRegistrationLogo from '../../assets/subject-registration-logo.png';
import studentManagementLogo from '../../assets/student-management-logo.png';
import './Homepage.css';

const Homepage = ({ isLoggedIn, onLogout }) => {
  const handleLogout = () => {
    sessionStorage.clear(); // Clear session storage
    onLogout(); // Perform logout action
  };

  return (
    <div className="homepage">
      <h1>Welcome to YJN ERP</h1>
      <div className="card-container">
        <Link to="/accounts" className="card">
          <div className="card-content">
            <h2>Accounts</h2>
            <div className="logo-container">
              <img src={accountsLogo} alt="Accounts Logo" className="logo-img" />
            </div>
          </div>
        </Link>
        <Link to="/certificate" className="card">
          <div className="card-content">
            <h2>Certificate</h2>
            <div className="logo-container">
              <img src={certificateLogo} alt="Certificate Logo" className="logo-img" />
            </div>
          </div>
        </Link>
        <Link to="/examination" className="card">
          <div className="card-content">
            <h2>Examination</h2>
            <div className="logo-container">
              <img src={examinationLogo} alt="Examination Logo" className="logo-img" />
            </div>
          </div>
        </Link>
        <Link to="/subject-registration" className="card">
          <div className="card-content">
            <h2>Registration</h2>
            <div className="logo-container">
              <img src={subjectRegistrationLogo} alt="Subject Registration Logo" className="logo-img" />
            </div>
          </div>
        </Link>
        <Link to="/student-management" className="card">
          <div className="card-content">
            <h2>Student Management</h2>
            <div className="logo-container">
              <img src={studentManagementLogo} alt="Student Management Logo" className="logo-img" />
            </div>
          </div>
        </Link>
      </div>
      {isLoggedIn && (
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Homepage;
