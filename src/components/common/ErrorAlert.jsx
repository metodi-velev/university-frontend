import React from 'react';
import './ErrorAlert.css';

const ErrorAlert = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="error-alert">
      <div className="error-alert-content">
        <span className="error-icon">⚠️</span>
        <span className="error-message">{message}</span>
        {onClose && (
          <button className="error-close" onClick={onClose}>
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorAlert;