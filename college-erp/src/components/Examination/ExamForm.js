import React, { useState } from 'react';
import './ExamForm.css';

function ExamForm() {
  const [studentId, setStudentId] = useState('');
  const [examName, setExamName] = useState('');
  const [examStatus, setExamStatus] = useState('');
  const [studentDetails, setStudentDetails] = useState(null);
  const [registeredSubjects, setRegisteredSubjects] = useState([]);

  const handleStudentIdChange = (event) => {
    setStudentId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Fetch student details
      const response = await fetch(`https://react-erp-1.onrender.com/search-student?id=${studentId}`);
      // const response = await fetch(`http://localhost:5000/search-student?id=${studentId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch student details');
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setStudentDetails(data[0]); // Assuming data[0] contains the student details object

      // Fetch registered subjects for the student
      const subjectsResponse = await fetch(`https://react-erp-1.onrender.com/subjects/${studentId}`);
      // const subjectsResponse = await fetch(`http://localhost:5000/subjects/${studentId}`);
      if (!subjectsResponse.ok) {
        throw new Error('Failed to fetch registered subjects');
      }
      const subjectsData = await subjectsResponse.json();
      console.log("Fetched Subjects: ", subjectsData); // Debugging: Check if data is correct
      setRegisteredSubjects(subjectsData);
    } catch (error) {
      console.error('Error fetching student details:', error);
      alert('Failed to fetch student details. Please try again.');
    }
  };

  const handleExamSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://react-erp-1.onrender.com/exam/submit', {
        // const response = await fetch('http://localhost:5000/exam/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ student_id: studentId, examName }) // Include student_id in the request body
      });
      if (!response.ok) {
        throw new Error('Failed to submit exam form');
      }
      const data = await response.json();
      setExamStatus(data.status);
    } catch (error) {
      console.error('Error submitting exam form:', error);
      alert('Failed to submit exam form. Please try again.');
    }
  };

  return (
    <div className="exam-form">
      <h1>Exam Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Student ID:
          <input type="text" value={studentId} onChange={handleStudentIdChange} required />
        </label>
        <button type="submit">Fetch Student Details</button>
      </form>

      {studentDetails && (
        <div>
          <h3>Student Details</h3>
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{studentDetails.student_id}</td>
                <td>{studentDetails.name}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {registeredSubjects.length > 0 && (
        <div className="registered-subjects">
          <h3>Registered Subjects</h3>
          <table>
            <thead>
              <tr>
                <th>Subject ID</th>
                <th>Subject Name</th>
              </tr>
            </thead>
            <tbody>
              {registeredSubjects.map((subject, index) => (
                <tr key={index}>
                  <td>{subject.id}</td>
                  <td>{subject.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <form onSubmit={handleExamSubmit}>
        <label>
          Exam Name:
          <input type="text" value={examName} onChange={(e) => setExamName(e.target.value)} required />
        </label>
        <button type="submit">Submit Exam Form</button>
      </form>

      {examStatus && <p>Exam submission status: {examStatus}</p>}
    </div>
  );
}

export default ExamForm;
