// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/accounts/pay-fees">Pay Fees</Link></li>
        <li><Link to="/accounts/fee-receipts">Fee Receipts</Link></li>
        <li><Link to="/certificate/request-documents">Request Documents</Link></li>
        <li><Link to="/examination/score-card">Score Card</Link></li>
        <li><Link to="/examination/exam-form">Exam Form</Link></li>
        <li><Link to="/examination/hall-ticket">Hall Ticket</Link></li>
        <li><Link to="/subject-registration">Subject Registration</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
