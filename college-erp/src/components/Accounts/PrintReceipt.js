import React from 'react';
import stamp from '../../assets/stamp.png';

const generateTransactionId = () => {
  // Function to generate a random transaction ID of fixed length
  const length = 12;
  const characters = '0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const PrintReceipt = ({ receipt, index }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleDateString();
  };

  const printReceipt = () => {
    const printWindow = window.open('', '', 'height=600,width=1200'); // Increased height and width
    printWindow.document.write('<html><head><title>Print Receipt</title>');
    printWindow.document.write('<style>');
    printWindow.document.write(`
      body {
        font-family: 'Poppins', sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        padding: 0;
      }
      .receipt-content {
        max-width: 1500px; /* Increased max-width for larger receipt */
        padding: 75px; /* Increased padding for more space */
        background-color: #d2e1f7;
        border-radius: 18px; /* Increased border radius */
        position: relative; /* Added relative position */
        overflow: hidden; /* Hide overflow for clip-path */
        box-shadow: 0 12px 16px rgba(0, 0, 0, 0.1), inset 0 0 20px rgba(0, 0, 0, 0.2); /* Added shadow */
      }
      .receipt-header {
        text-align: center;
        margin-bottom: 45px; /* Increased margin */
        font-weight: 700;
        font-size: 3em; /* Increased font size */
        color: #007bff; /* Header color */
      }
      .receipt-details {
        margin-bottom: 45px; /* Increased margin */
        font-size: 1.8em; /* Increased font size */
        color: #555;
        line-height: 2;
      }
      .receipt-stamp-signature {
        display: flex;
        align-items: center;
        justify-content: center; /* Centering stamp */
        margin-top: 45px; /* Increased margin */
      }
      .receipt-stamp {
        width: 180px; /* Increased stamp size */
        height: auto;
      }
      .receipt-footer {
        text-align: center;
        margin-top: 45px; /* Increased margin */
        font-size: 1.5em; /* Increased font size */
        color: #555;
        position: relative; /* Added relative position */
      }
      .zigzag-pattern {
        width: 100%; /* Full width */
        height: 30px; /* Adjust height of zigzag pattern */
        position: absolute; /* Absolute positioning relative to receipt-content */
        bottom: -15px; /* Align at the bottom with some overlap */
        left: 0; /* Align to the left */
        background-image: linear-gradient(135deg, #fff 25%, transparent 25%),
                          linear-gradient(45deg, #fff 25%, transparent 25%),
                          linear-gradient(315deg, #fff 25%, transparent 25%),
                          linear-gradient(225deg, #fff 25%, transparent 25%);
        background-position: -30px 0, -30px 0, 0 0, 0 0;
        background-size: 60px 60px;
        background-repeat: repeat-x; /* Repeat horizontally */
        z-index: 1; /* Behind main content */
      }
    `);
    printWindow.document.write('</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(`
      <div id="receipt-${index}" class="receipt-content">
        <div class="receipt-header">
          <h3>Fee Receipt</h3>
        </div>
        <div class="receipt-details">
          <strong>Student ID:</strong> ${receipt.student_id}<br />
          <strong>Date:</strong> ${formatDate(receipt.payment_date)}<br />
          <strong>Amount: ₹</strong> ${receipt.amount}<strong> only</strong><br />
          <strong>Transaction ID:</strong> ${generateTransactionId()}<br />
        </div>
        <div class="receipt-stamp-signature">
          <img src=${stamp} alt="Stamp" class="receipt-stamp" />
        </div>
        <div class="receipt-footer">
          <p>Thank you for your payment!</p>
        </div>
        <div class="zigzag-pattern"></div> <!-- Zigzag pattern -->
      </div>
    `);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    };
  };

  return (
    <div className="receipt-content">
      <div className="receipt-header">
        <h3>Fee Receipt</h3>
      </div>
      <div className="receipt-details">
        <strong>Student ID:</strong> {receipt.student_id}<br />
        <strong>Date:</strong> {formatDate(receipt.payment_date)}<br />
        <strong>Amount:</strong> {receipt.amount}<br />
        <strong>Transaction ID:</strong> {generateTransactionId()}<br />
      </div>
      <div className="zigzag-pattern"></div> {/* Zigzag pattern */}
      <button onClick={printReceipt} className="print-button">Print Receipt</button>
    </div>
  );
};

export default PrintReceipt;
