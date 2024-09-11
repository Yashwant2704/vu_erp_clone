import React, { useState } from 'react';
import './StudentRegistration.css';

function StudentRegistration() {
  const [studentId, setStudentId] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const subjects = [
    { id: 1, name: 'Applied Mathematics' },
    { id: 2, name: 'Linear Algebra And Statistics' },
    { id: 3, name: 'Discrete Mathematics' },
    { id: 4, name: 'Fundamentals Of Electronics' },
    { id: 5, name: 'Computer Organization And Architecture' },
    { id: 6, name: 'Hardware And Software Workshop' },
    { id: 7, name: 'Introduction To Computer Programming' },
    { id: 8, name: 'Logic Development In Programming' },
    { id: 9, name: 'Computer Graphics And Gaming' },
    { id: 10, name: 'Technology Skill Development 1 - OOPS Using C++' },
    { id: 11, name: 'Technology Skill Development 2 - Python' },
    { id: 12, name: 'Technology Skill Development 3 - Java' },
    { id: 13, name: 'Applied Statistical Analysis' },
    { id: 14, name: 'Data Structures' },
    { id: 15, name: 'Communication Skills' },
    { id: 16, name: 'Environmental Studies' },
    { id: 17, name: 'Capstone Project' },
    { id: 18, name: 'Web Technology Lab' },
    { id: 19, name: 'Advanced Web Technology Lab' },
    { id: 20, name: 'Mobile Application Development' },
    { id: 21, name: 'Processor Architecture' },
    { id: 22, name: 'Information Security Fundamentals' },
    { id: 23, name: 'Finance And Accounting' },
    { id: 24, name: 'Theory Of Computation' },
    { id: 25, name: 'Application Security' }
  ];

  const handleStudentIdChange = (event) => {
    setStudentId(event.target.value);
  };

  const handleCardClick = (subject) => {
    if (selectedSubjects.some(item => item.id === subject.id)) {
      setSelectedSubjects(selectedSubjects.filter(item => item.id !== subject.id));
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const handleRegistration = async (event) => {
    event.preventDefault();

    try {
      // const response = await fetch('http://localhost:5000/register-subjects', {
        const response = await fetch('https://react-erp-1.onrender.com/register-subjects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ student_id: studentId, subjects: selectedSubjects }),
      });

      if (!response.ok) {
        throw new Error('Failed to register subjects');
      }

      // Clear selected subjects after successful registration
      setSelectedSubjects([]);
      setStudentId('');
      alert('Subjects registered successfully!');
    } catch (error) {
      console.error('Error registering subjects:', error);
      alert('Failed to register subjects. Please try again.');
    }
  };

  return (
    <div className="student-registration">
      <h2>Student Registration</h2>
      <form onSubmit={handleRegistration}>
        <label>
          Student ID:
          <input
            type="text"
            value={studentId}
            onChange={handleStudentIdChange}
            placeholder="Enter Student ID"
            required
          />
        </label>
        <label>
          Select Subjects:
          <div className="subject-cards">
            {subjects.map(subject => (
              <div
                key={subject.id}
                className={`subject-card ${selectedSubjects.some(item => item.id === subject.id) ? 'selected' : ''}`}
                onClick={() => handleCardClick(subject)}
              >
                {subject.name}
              </div>
            ))}
          </div>
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default StudentRegistration;
