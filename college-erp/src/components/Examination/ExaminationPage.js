// src/components/Examination/ExaminationPage.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../Homepage/Homepage.css'; // Reuse the same CSS for consistency
import scoreCardLogo from '../../assets/score-card-logo.png'; // Importing logos
import examFormLogo from '../../assets/exam-form-logo.png';
import hallTicketLogo from '../../assets/hall-ticket-logo.png';

const ExaminationPage = () => {
  return (
    <div className="nested-page">
      <h1>Examination</h1>
      <div className="card-container">
        <Link to="/examination/score-card" className="card">
          <div className="card-content">
            <h2>Score Card</h2>
            <div className="logo-container">
            <img src={scoreCardLogo} alt="Score Card Logo" className="logo-img" /> {/* Include the logo */}
            </div>
          </div>
        </Link>
        <Link to="/examination/exam-form" className="card">
          <div className="card-content">
            <h2>Exam Form</h2>
            <div className="logo-container">
            <img src={examFormLogo} alt="Exam Form Logo" className="logo-img" /> {/* Include the logo */}
            </div>
          </div>
        </Link>
        <Link to="/examination/hall-ticket" className="card">
          <div className="card-content">
            <h2>Hall Ticket</h2>
            <div className="logo-container">
            <img src={hallTicketLogo} alt="Hall Ticket Logo" className="logo-img" /> {/* Include the logo */}
            </div>
          </div>
        </Link>
        <Link to="/examination/hall-ticket-form" className="card">
          <div className="card-content">
            <h2>Hall Ticket Form</h2>
            <div className="logo-container">
            <img src={examFormLogo} alt="Exam Form Logo" className="logo-img" /> {/* Include the logo */}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ExaminationPage;
