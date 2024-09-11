import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import mylogo from "../../assets/512x512.png";
import './Breadcrumbs.css';

const breadcrumbNameMap = {
  '/student-management': 'Student Management',
  '/student-management/add-student-form': 'Add Student',
  '/student-management/view-all-students': 'View All Students',
  '/student-management/search-student': 'Search Student',
  // Add more mappings as necessary for other routes
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const handleNavigateBack = () => {
    if (pathnames.length > 1) {
      const previousPath = `/${pathnames.slice(0, -1).join('/')}`;
      return (
        <Link to={previousPath} className="back-button">
          <FiArrowLeft />
          Back
        </Link>
      );
    } else {
      return (
        <Link to="/" className="back-button">
          <FiArrowLeft />
          Back
        </Link>
      );
    }
  };

  return (
    <div className="breadcrumb">
      <img src={mylogo} alt="Logo" className="logo-img" />
      <ul>
        <li>
          {handleNavigateBack()}
        </li>
        {/* Ensure Home link does not have a separator before it */}
        <li>
          <Link to="/">Home</Link>
        </li>
        {pathnames.map((name, index) => {
          const path = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return (
            <li key={name}>
              {!isLast ? (
                <Link to={path}>{breadcrumbNameMap[path] || name}</Link>
              ) : (
                <span>{breadcrumbNameMap[path] || name}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
