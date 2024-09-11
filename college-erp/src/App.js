// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import AccountsPage from './components/Accounts/AccountsPage';
import PayFees from './components/Accounts/PayFees';
import FeeReceipts from './components/Accounts/FeeReceipts';
import CertificatePage from './components/Certificate/CertificatePage';
import RequestDocuments from './components/Certificate/RequestDocuments';
import ExaminationPage from './components/Examination/ExaminationPage';
import ScoreCard from './components/Examination/ScoreCard';
import ExamForm from './components/Examination/ExamForm';
import HallTicket from './components/Examination/HallTicket';
import StudentRegistration from './components/SubjectRegistration/StudentRegistration';
import RequestedDocuments from './components/Certificate/RequestedDocuments';
import HallTicketForm from './components/Examination/HallTicketForm';
import Login from './components/Login';
import Register from './components/Register';
import AddStudentCard from './components/AddStudent/AddStudentCard';
import AddStudentForm from './components/AddStudent/AddStudentForm';
import StudentManagement from './components/StudentManagement/StudentManagement';
import ViewAllStudents from './components/StudentManagement/ViewAllStudents';
import SearchStudent from './components/StudentManagement/SearchStudent';
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';
import Footer from './components/Footer/Footer';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check session storage for login status
    const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('isLoggedIn');
  };

  return (
    <Router>
      <div className="app-container">
        <Breadcrumbs />
        <div className="main-content">
          <Routes>
            <Route path="/" element={isLoggedIn ? <Homepage isLoggedIn={isLoggedIn} onLogout={handleLogout} /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Homepage onLogout={handleLogout} />} />
            <Route path="/accounts" element={isLoggedIn ? <AccountsPage /> : <Navigate to="/login" />} />
            <Route path="/accounts/pay-fees" element={isLoggedIn ? <PayFees /> : <Navigate to="/login" />} />
            <Route path="/accounts/fee-receipts" element={isLoggedIn ? <FeeReceipts /> : <Navigate to="/login" />} />
            <Route path="/certificate" element={isLoggedIn ? <CertificatePage /> : <Navigate to="/login" />} />
            <Route path="/certificate/request-documents" element={isLoggedIn ? <RequestDocuments /> : <Navigate to="/login" />} />
            <Route path="/certificate/requested-documents" element={isLoggedIn ? <RequestedDocuments /> : <Navigate to="/login" />} />
            <Route path="/examination" element={isLoggedIn ? <ExaminationPage /> : <Navigate to="/login" />} />
            <Route path="/examination/score-card" element={isLoggedIn ? <ScoreCard /> : <Navigate to="/login" />} />
            <Route path="/examination/exam-form" element={isLoggedIn ? <ExamForm /> : <Navigate to="/login" />} />
            <Route path="/examination/hall-ticket" element={isLoggedIn ? <HallTicket /> : <Navigate to="/login" />} />
            <Route path="/examination/hall-ticket-form" element={isLoggedIn ? <HallTicketForm /> : <Navigate to="/login" />} />
            <Route path="/subject-registration" element={isLoggedIn ? <StudentRegistration /> : <Navigate to="/login" />} />
            <Route path="/AddStudentCard" element={isLoggedIn ? <AddStudentCard /> : <Navigate to="/login" />} />
            <Route path="/add-student-form" element={isLoggedIn ? <AddStudentForm /> : <Navigate to="/login" />} />
            <Route path="/student-management" element={isLoggedIn ? <StudentManagement /> : <Navigate to="/login" />} />
            <Route path="/view-all-students" element={isLoggedIn ? <ViewAllStudents /> : <Navigate to="/login" />} />
            <Route path="/search-student" element={isLoggedIn ? <SearchStudent /> : <Navigate to="/login" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;