import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStudentContext } from '../../context/StudentContext';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearSearch, openForm, fetchAllStudents } = useStudentContext();

  const handleStudentsClick = (e) => {
    e.preventDefault();
    // Clear search and fetch all students
    clearSearch();
    // Navigate to home
    navigate('/');
    // Ensure form is closed
    // Note: We'll handle this through context
  };

  const handleAddStudentClick = (e) => {
    e.preventDefault();
    // Open the form
    openForm();
    // Navigate to home to show the form
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <Link to="/" className="nav-brand">
            <div className="brand-icon-wrapper">
              <span className="brand-icon">🎓</span>
            </div>
            <span className="brand-text">University<span className="brand-highlight">Hub</span></span>
          </Link>
          
          <ul className="nav-links">
            <li>
              <a 
                href="#"
                className={`nav-link ${location.pathname === '/' || location.pathname === '/students' ? 'active' : ''}`}
                onClick={handleStudentsClick}
              >
                <span className="nav-icon">📋</span>
                Students
              </a>
            </li>
            <li>
              <a 
                href="#"
                className={`nav-link ${location.pathname === '/students/new' ? 'active' : ''}`}
                onClick={handleAddStudentClick}
              >
                <span className="nav-icon">➕</span>
                Add Student
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;