import React, { useState } from 'react';
import './HallTicketForm.css';

const HallTicketForm = () => {
  const [student_id, setstudent_id] = useState('');
  const [examName, setExamName] = useState('');
  const [examDate, setExamDate] = useState('');
  const [venue, setVenue] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://react-erp-1.onrender.com/examination/hall-ticket', {
      // const response = await fetch('http://localhost:5000/examination/hall-ticket', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ student_id, examName, examDate, venue }),
      });
      if (!response.ok) {
        throw new Error('Failed to submit hall ticket details');
      }
      setMessage('Hall ticket details submitted successfully!');
      setIsError(false);
      setstudent_id('');
      setExamName('');
      setExamDate('');
      setVenue('');
    } catch (error) {
      console.error('Error submitting hall ticket details:', error);
      setMessage('Error submitting hall ticket details. Please try again.');
      setIsError(true);
    }
  };

  return (
    <div className="hall-ticket-form-container">
      <h1>Fill Hall Ticket Details</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="student_id">Student ID:</label>
          <input type="text" id="student_id" value={student_id} onChange={(e) => setstudent_id(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="examName">Exam Name:</label>
          <input type="text" id="examName" value={examName} onChange={(e) => setExamName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="examDate">Exam Start Date:</label>
          <input type="date" id="examDate" value={examDate} onChange={(e) => setExamDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="venue">Venue:</label>
          <input type="text" id="venue" value={venue} onChange={(e) => setVenue(e.target.value)} required />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
      {message && <p className={`message ${isError ? 'error' : ''}`}>{message}</p>}
    </div>
  );
};

export default HallTicketForm;
