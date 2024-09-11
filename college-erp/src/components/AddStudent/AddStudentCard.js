import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
// import './AddStudentCard.css'; // Import your CSS file if you have one

const AddStudentCard = () => {
  return (
    <Link to="/add-student-form" className="card-link"> {/* Link wraps the card */}
      <div className="card">
        <div className="card-content">
          <h1>Add Student</h1>
          <p>Add a new student to the database</p>
        </div>
      </div>
    </Link>
  );
};

export default AddStudentCard;
