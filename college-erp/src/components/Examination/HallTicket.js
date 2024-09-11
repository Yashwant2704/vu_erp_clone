import React, { useState, useRef } from 'react';
import HallTicketContent from './HallTicketContent'; // Import the printable component
import { useReactToPrint } from 'react-to-print';
import { ScaleLoader } from 'react-spinners';
import './HallTicket.css'; // Import the CSS file

const HallTicket = () => {
  const [hallTicket, setHallTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [studentId, setStudentId] = useState('');
  const [studentDetails, setStudentDetails] = useState(null);
  const [registeredSubjects, setRegisteredSubjects] = useState([]);

  const contentRef = useRef(); // Ref to the printable component

  // Function to fetch hall ticket based on student ID
  const fetchHallTicket = async (studentId) => {
    setLoading(true);
    setError(null);
    setHallTicket(null);

    // Simulate loading time with a timeout
    setTimeout(async () => {
      try {
        // Fetch student details
        // const studentResponse = await fetch(`http://localhost:5000/search-student?id=${studentId}`);
        const studentResponse = await fetch(`https://react-erp-1.onrender.com/search-student?id=${studentId}`);
        if (!studentResponse.ok) {
          throw new Error('Failed to fetch student details');
        }
        const studentData = await studentResponse.json();
        if (studentData.error) {
          throw new Error(studentData.error);
        }
        setStudentDetails(studentData[0]);

        // Fetch hall ticket details
        // const hallTicketResponse = await fetch(`http://localhost:5000/examination/hall-ticket?student_id=${studentId}`);
        const hallTicketResponse = await fetch(`https://react-erp-1.onrender.com/examination/hall-ticket?student_id=${studentId}`);
        if (!hallTicketResponse.ok) {
          throw new Error('Failed to fetch hall ticket');
        }
        const hallTicketData = await hallTicketResponse.json();
        setHallTicket(hallTicketData);

        // Fetch registered subjects
        // const subjectsResponse = await fetch(`http://localhost:5000/subjects/${studentId}`);
        const subjectsResponse = await fetch(`https://react-erp-1.onrender.com/subjects/${studentId}`);
        if (!subjectsResponse.ok) {
          throw new Error('Failed to fetch registered subjects');
        }
        const subjectsData = await subjectsResponse.json();
        setRegisteredSubjects(subjectsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }, 2000); // 2-second delay to simulate loading
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (studentId.trim() !== '') {
      fetchHallTicket(studentId);
    } else {
      setError('Please enter a valid student ID');
    }
  };

  // Printing function
  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
  });

  return (
    <div>
      <div className="fetch-container">
        <h1>Fetch Hall Ticket</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="studentId">Student ID:</label>
          <input
            type="text"
            id="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Enter student ID"
            required
          />
          <button type="submit">Fetch Hall Ticket</button>
        </form>

        {loading && (
          <div className="loading-spinner">
            <ScaleLoader size={50} color="#123abc" loading={loading} />
          </div>
        )}

        {error && <div className="error-message">Error: {error}</div>}

        {!loading && !error && !hallTicket && (
          <div className="info-message">Please enter a student ID to fetch the hall ticket.</div>
        )}
      </div>

      {hallTicket && studentDetails && registeredSubjects.length > 0 && (
        <div className="hall-ticket-content">
          <HallTicketContent
            ref={contentRef}
            hallTicket={hallTicket}
            studentDetails={studentDetails}
            registeredSubjects={registeredSubjects}
          />
          <button onClick={handlePrint} className="print-button">Print Hall Ticket</button>
        </div>
      )}
    </div>
  );
};

export default HallTicket;
