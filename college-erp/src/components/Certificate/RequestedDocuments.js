import React, { useState, useEffect } from 'react';
import './RequestedDocuments.css'; // Import the CSS for styling

const RequestedDocuments = () => {
  const [requestedDocuments, setRequestedDocuments] = useState([]);

  useEffect(() => {
    fetchRequestedDocuments();
  }, []);

  const fetchRequestedDocuments = async () => {
    try {
      const response = await fetch('https://react-erp-1.onrender.com/certificate/requested-documents');
      // const response = await fetch('http://localhost:5000/certificate/requested-documents');
      if (!response.ok) {
        throw new Error('Failed to fetch requested documents');
      }
      const data = await response.json();
      setRequestedDocuments(data);
    } catch (error) {
      console.error('Error fetching requested documents:', error);
    }
  };

  const markAsVerified = async (documentId) => {
    try {
      // Find the document element and add the fade-out class
      const docElement = document.getElementById(`doc-${documentId}`);
      docElement.classList.add('fade-out');

      // Wait for the animation to complete (adjust to match the CSS transition duration)
      setTimeout(async () => {
        // Make the delete request
        const response = await fetch(`https://react-erp-1.onrender.com/certificate/requested-documents/${documentId}`, {
        // const response = await fetch(`http://localhost:5000/certificate/requested-documents/${documentId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to mark document as verified');
        }
        // Remove the document from the local state after the animation
        setRequestedDocuments(requestedDocuments.filter(doc => doc.id !== documentId));
      }, 500); // This delay should match the CSS transition duration
    } catch (error) {
      console.error('Error marking document as verified:', error);
    }
  };

  return (
    <div className="requested-documents-page">
      <h1>Requested Documents</h1>
      <div className="document-list-container">
        <ul className="document-list">
          {requestedDocuments.length === 0 ? (
            <li>No documents requested yet.</li>
          ) : (
            requestedDocuments.map((doc) => (
              <li key={doc.id} id={`doc-${doc.id}`} className="document-item">
                <div className="document-item-content">
                  <div className="document-item-details">
                    <strong>Document Type:</strong> {doc.document_type}<br />
                    <strong>Requested By Student ID:</strong> {doc.student_id}<br />
                    <strong>Request Date:</strong> {new Date(doc.request_date).toLocaleDateString()}<br />
                  </div>
                  <button onClick={() => markAsVerified(doc.id)} className="mark-verified-button">
                    Mark as Verified
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default RequestedDocuments;
