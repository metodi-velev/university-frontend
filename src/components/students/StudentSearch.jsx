import React, { useState, useEffect } from 'react';
import { useStudentContext } from '../../context/StudentContext';
import './StudentSearch.css';

const StudentSearch = () => {
  const { searchStudentByEmail, searchEmail, loading, clearSearch } = useStudentContext();
  const [emailInput, setEmailInput] = useState(searchEmail || '');

  // Update input when searchEmail changes from outside
  useEffect(() => {
    setEmailInput(searchEmail || '');
  }, [searchEmail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      searchStudentByEmail(emailInput.trim());
    }
  };

  const handleClear = () => {
    setEmailInput('');
    clearSearch();
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="email"
            className="search-input"
            placeholder="Search by email address..."
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            disabled={loading}
          />
          {emailInput && (
            <button
              type="button"
              className="clear-button"
              onClick={handleClear}
            >
              ✕
            </button>
          )}
        </div>
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading || !emailInput.trim()}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
    </div>
  );
};

export default StudentSearch;