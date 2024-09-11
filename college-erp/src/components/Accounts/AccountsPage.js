// src/components/Accounts/AccountsPage.js

import React from 'react';
import { Link } from 'react-router-dom';
import fees from '../../assets/fee-logo.png'; // Importing the logo image
import reciept from '../../assets/receipt.png';
import '../Homepage/Homepage.css'; // Reuse the same CSS for consistency

const AccountsPage = () => {
  return (
    <div className="nested-page">
      <h1>Accounts</h1>
      <div className="card-container">
        <Link to="/accounts/pay-fees" className="card">
          <div className="card-content">
            <h2>Pay Fees</h2>
            <div class="logo-container">
            <img src={fees} alt="Accounts Logo" className="logo-img" /> {/* Include the logo */}
            </div>
          </div>
        </Link>
        <Link to="/accounts/fee-receipts" className="card">
          <div className="card-content">
            <h2>Fee Receipts</h2>
            <div class="logo-container">
            <img src={reciept} alt="Accounts Logo" className="logo-img" /> {/* Include the logo */}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AccountsPage;
