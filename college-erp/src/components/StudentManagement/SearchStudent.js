import React, { useState } from 'react';
import axios from 'axios';
import './StudentManagement.css';

const SearchStudent = () => {
  const [studentId, setStudentId] = useState('');
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    if (!studentId.trim()) {
      setError('Please enter a Student ID');
      return;
    }

    setLoading(true);
    setError(null);
    setStudent(null);

    // Fetch student by ID from the API
    // axios.get(`http://localhost:5000/search-student?id=${studentId}`)
    axios.get(`https://react-erp-1.onrender.com/search-student?id=${studentId}`)
      .then(response => {
        if (response.data.length === 0) {
          setError('No student found with this ID');
        } else {
          setStudent(response.data[0]);
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch student');
        setLoading(false);
      });
  };

  return (
    <div className="search-student">
      <h1>Search Student by ID</h1>
      <input
        type="text"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        placeholder="Enter Student ID"
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {student && (
        <div className="student-details">
          <h2>Student Details</h2>
          <p><strong>ID:</strong> {student.id}</p>
          <p><strong>Student ID:</strong> {student.student_id}</p>
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>PRN:</strong> {student.prn}</p>
          <p><strong>Seat:</strong> {student.prn}</p>
        </div>
      )}
    </div>
  );
};

export default SearchStudent;
