import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentManagement.css'; // You can add specific styles for the component here.

const ViewAllStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all students from the API
    // axios.get('http://localhost:5000/student-details')
    axios.get('https://react-erp-1.onrender.com/student-details')
      .then(response => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch students');
        setLoading(false);
      });
  }, []);

  const handleDelete = (studentId) => {
    // axios.delete(`http://localhost:5000/search-student?id=${studentId}`)
    axios.delete(`https://react-erp-1.onrender.com/search-student?id=${studentId}`)
      .then(response => {
        console.log(response.data); // Assuming you want to log the response

        // Update the state to remove the deleted student
        setStudents(prevStudents => prevStudents.filter(student => student.student_id !== studentId));
      })
      .catch(error => {
        console.error('Failed to delete student:', error);
        // Handle error state if needed
      });
  };

  if (loading) return <p>Loading students...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="view-all-students">
      <h1>All Students</h1>
      <table>
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>PRN</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.student_id}</td>
              <td>{student.name}</td>
              <td>{student.prn}</td>
              <td>
                <button onClick={() => handleDelete(student.student_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAllStudents;
