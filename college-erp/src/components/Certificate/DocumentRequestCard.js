import React from 'react';
import { Link } from 'react-router-dom';
import './DocumentRequestCard.css'; // Create a CSS file for styling

const DocumentRequestCard = ({ documentType, requestId }) => {
  return (
    <Link to="/certificate/request" className="document-request-card">
      <div className="card-content">
        <h1>{documentType}</h1>
        <p>Request ID: {requestId}</p>
      </div>
    </Link>
  );
}

export default DocumentRequestCard;
