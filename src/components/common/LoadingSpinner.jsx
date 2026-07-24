import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium' }) => {
  return (
    <div className="spinner-container">
      <div className={`spinner spinner-${size}`}></div>
      <p className="spinner-text">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;