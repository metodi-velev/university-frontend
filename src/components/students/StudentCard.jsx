import React from 'react';
import { Link } from 'react-router-dom';
import './StudentCard.css';

const StudentCard = ({ student }) => {
  if (!student) {
    return null;
  }

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (email) => {
    if (!email) return '#4299e1';
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#FF9F43', '#00D2D3'];
    const index = email.length % colors.length;
    return colors[index];
  };

  return (
    <Link to={`/students/${student.id}`} className="student-card-link">
      <div className="student-card">
        <div className="student-card-header">
          <div
            className="student-avatar"
            style={{ backgroundColor: getAvatarColor(student.email) }}
          >
            {getInitials(student.name)}
          </div>
          <div className="student-card-title">
            <h3 className="student-name">{student.name || 'Unnamed'}</h3>
            {student.age && (
              <span className="student-age">{student.age} years old</span>
            )}
          </div>
        </div>

        <div className="student-card-body">
          <div className="student-info-item">
            <span className="info-label">📧 Email</span>
            <span className="info-value">{student.email || 'No email'}</span>
          </div>
          <div className="student-info-item">
            <span className="info-label">🆔 ID</span>
            <span className="info-value">#{student.id}</span>
          </div>
        </div>

        <div className="student-card-footer">
          <span className="view-details">View Details →</span>
        </div>
      </div>
    </Link>
  );
};

export default StudentCard;