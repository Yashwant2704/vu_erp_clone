import React, { useEffect, useState } from 'react';
import './FeeReceipts.css'; // Ensure this file contains styles for the component
import PrintReceipt from './PrintReceipt'; // Import the new component for printing

const FeeReceipts = () => {
  // State to store fee receipts, loading status, and any error messages
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch fee receipts from the server when the component mounts
  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const response = await fetch('https://react-erp-1.onrender.com/fee-receipts');
        // const response = await fetch('http://localhost:5000/fee-receipts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setReceipts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReceipts();
  }, []);

  // Display a loading message while data is being fetched
  if (loading) {
    return <div className="fee-receipts">Loading...</div>;
  }

  // Display an error message if there's an issue fetching data
  if (error) {
    return <div className="fee-receipts">Error: {error}</div>;
  }

  return (
    <div className="fee-receipts">
      <h1>Fee Receipts</h1>
      <div className="receipt-grid">
        <div className="scrollable-container">
          {receipts.length === 0 ? (
            <p>No fee receipts available.</p>
          ) : (
            receipts.map((receipt, index) => (
              <div key={receipt.id} className="receipt-item">
                <PrintReceipt receipt={receipt} index={index} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FeeReceipts;
