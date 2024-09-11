// src/components/CertificatePage/CertificatePage.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Homepage/Homepage.css'; // Reuse the same CSS for consistency
import certificateLogo from '../../assets/document.png'; // Importing the logo image
import list from '../../assets/list_of_documents.png';

const CertificatePage = () => {

  return (
    <div className="nested-page">
      <h1>Certificate</h1>
      <div className="card-container">
        <Link to="/certificate/request-documents" className="card">
          <div className="card-content">
            <h2>Request Documents</h2>
            <div className="logo-container">
            <img src={certificateLogo} alt="Certificate Logo" className="logo-img" /> {/* Include the logo */}
            </div>
          </div>
        </Link>

        <Link to="/certificate/requested-documents" className="card">
          <div className="card-content">
            <h2>View Documents</h2>
            <div className="logo-container">
            <img src={list} alt="Certificate Logo" className="logo-img" /> {/* Include the logo */}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CertificatePage;
