import React, { useState } from 'react';
import './PayFees.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function PayFees() {
  const [student_id, setstudent_id] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handlePayment = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation for student_id and amount
    if (!student_id || isNaN(student_id) || parseInt(student_id) <= 0) {
      setError('Please enter a valid student ID.');
      return;
    }

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setError('Please enter a valid positive amount.');
      return;
    }

    try {
      const response = await fetch('https://react-erp-1.onrender.com/pay-fees', {
        // const response = await fetch('http://10.25.0.34:5000/pay-fees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ student_id: parseInt(student_id), amount: parseFloat(amount) }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process payment');
      }

      const data = await response.json();
      showSnackbarMessage(data.message);
      setError('');
    } catch (error) {
      setError(`Error processing payment: ${error.message}`);
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
    <div className="pay-fees">
      <h1>Pay Fees</h1>
      <form onSubmit={handlePayment}>
        <div>
          <label htmlFor="student_id">Student ID:</label>
          <input
            type="text"
            id="student_id"
            value={student_id}
            onChange={(e) => setstudent_id(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button type="submit">Pay</button>
      </form>
      {error && <p className="error-message">{error}</p>}

      {/* Snackbar Component for displaying success/error message */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        className="pay-fees-snackbar"  // Add this custom class
      >
        <MuiAlert onClose={handleCloseSnackbar} severity={error ? 'error' : 'success'} sx={{ width: '100%' }}>
          {error ? error : snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default PayFees;
