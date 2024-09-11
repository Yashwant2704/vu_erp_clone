// src/components/AddStudentForm.js

import React, { useState } from 'react';
import axios from 'axios';
import './AddStudentForm.css'; // Import the CSS file

const AddStudentForm = () => {
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [prn, setPrn] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make API call to add student to the database
      const response = await axios.post('https://react-erp-1.onrender.com/add-student', {
        // const response = await axios.post('http://localhost:5000/add-student', {
        studentId,
        name,
        prn
      });

      // Check if the student was successfully added
      if (response.data.success) {
        setSuccess('Student added successfully');
        // Clear input fields
        setStudentId('');
        setName('');
        setPrn('');
        setError(''); // Clear any previous error
      } else {
        setError('Failed to add student. Please try again.');
        setSuccess(''); // Clear any previous success message
      }
    } catch (error) {
      setError('An error occurred while adding the student. Please try again.');
      setSuccess(''); // Clear any previous success message
    }
  };

  return (
    <div className="add-student-form">
      <h1>Add Student</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="studentId">Student ID:</label>
          <input
            type="text"
            id="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="prn">PRN:</label>
          <input
            type="text"
            id="prn"
            value={prn}
            onChange={(e) => setPrn(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudentForm;
