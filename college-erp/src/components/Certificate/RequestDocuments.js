import React, { useState } from 'react';
import './RequestDocuments.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function RequestDocuments() {
  const [documentType, setDocumentType] = useState('');
  const [requestStatus, setRequestStatus] = useState('');
  const [student_id, setStudentId] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleRequest = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://react-erp-1.onrender.com/certificate/request', {
        // const response = await fetch('http://localhost:5000/certificate/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ student_id, documentType })
      });
      if (!response.ok) {
        throw new Error('Failed to request document');
      }
      const data = await response.json();
      showSnackbarMessage(data.status);
    } catch (error) {
      console.error('Error requesting document:', error);
      showSnackbarMessage('Failed to request document');
    }
  };

  const showSnackbarMessage = (message) => {
    setSnackbarMessage(message);
    setShowSnackbar(true);

    // Hide the snackbar after 3 seconds
    setTimeout(() => {
      setShowSnackbar(false);
      setSnackbarMessage('');
    }, 3000);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSnackbar(false);
  };

  return (
    <div className="request-documents">
      <h1>Request Documents</h1>
      <form onSubmit={handleRequest}>
        <label>
          Student ID:
          <input
            type="text"
            value={student_id}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </label>
        <label>
          Document Type:
          <select value={documentType} onChange={(e) => setDocumentType(e.target.value)} required>
            <option value="">Select</option>
            <option value="Bonafide">Bonafide</option>
            <option value="Transcript">Transcript</option>
          </select>
        </label>
        <button type="submit">Request</button>
      </form>
      {requestStatus && <p>Request status: {requestStatus}</p>}

      {/* Snackbar Component for displaying success/error message */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        className="request-document-snackbar"
      >
        <MuiAlert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default RequestDocuments;
