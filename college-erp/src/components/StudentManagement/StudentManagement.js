// src/components/StudentManagement/StudentManagement.js

import React from 'react';
import { Link } from 'react-router-dom';
import viewAllStudentsLogo from '../../assets/view-all-students-logo.png';
import searchStudentLogo from '../../assets/search-student-logo.png';
import AddStudentLogo from '../../assets/AddStudentLogo.png'
import '../Homepage/Homepage.css';

const StudentManagement = () => {
  return (
    <div className="student-management">
      <h1>Student Management</h1>
      <div className="card-container">
      <Link to="/add-student-form" className="card">
          <div className="card-content">
            <h2>Add Student</h2>
            <div className="logo-container">
              <img src={AddStudentLogo} alt="Add Student Logo" className="logo-img" />
            </div>
          </div>
        </Link>
        <Link to="/view-all-students" className="card">
          <div className="card-content">
            <h2>View All Students</h2>
            <div className="logo-container">
              <img src={viewAllStudentsLogo} alt="View All Students Logo" className="logo-img" />
            </div>
          </div>
        </Link>
        <Link to="/search-student" className="card">
          <div className="card-content">
            <h2>Search Student</h2>
            <div className="logo-container">
              <img src={searchStudentLogo} alt="Search Student Logo" className="logo-img" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default StudentManagement;
