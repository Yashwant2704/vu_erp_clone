import React, { forwardRef } from 'react';
import sign from '../../assets/sign.png';
import stamp from '../../assets/stamp.png';
import './HallTicketContent.css'; // Import the CSS for styling

// This is the component that will be printed
const HallTicketContent = forwardRef((props, ref) => (
  <div ref={ref} className="hall-ticket-content">
    <h2>Hall Ticket</h2>
    <table>
      <thead>
        <tr>
          <th>Student ID</th>
          <th>Name</th>
          <th>PRN</th>
          <th>Exam Name</th>
          <th>Exam Start Date</th>
          <th>Venue</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{props.studentDetails.student_id}</td>
          <td>{props.studentDetails.name}</td>
          <td>{props.studentDetails.prn}</td>
          <td>{props.hallTicket.exam_name}</td>
          <td>{new Date(props.hallTicket.exam_date).toLocaleDateString()}</td>
          <td>{props.hallTicket.venue}</td>
        </tr>
      </tbody>
    </table>

    <h3>Exam Subjects</h3>
    <table>
      <thead>
        <tr>
          <th>Course ID</th>
          <th>Name</th>
          <th>Invigilator Signature</th>
        </tr>
      </thead>
      <tbody>
        {props.registeredSubjects.map((subject) => (
          <tr key={subject.id}>
            <td>{subject.id}</td>
            <td>{subject.name}</td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* Signature and Stamp */}
    <div className="signature">
      <p>Controller of Examinations:</p>
      <img src={sign} alt="Signature" className="signature-image" />
    </div>
    <div className="stamp">
      <p>Exam Section:</p>
      <img src={stamp} alt="Stamp" className="stamp-image" />
    </div>
  </div>
));

export default HallTicketContent;
