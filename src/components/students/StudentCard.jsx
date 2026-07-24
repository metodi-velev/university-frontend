import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudentContext } from '../../context/StudentContext';
import { toast } from 'react-toastify';
import './StudentCard.css';

const StudentCard = ({ student }) => {
  const navigate = useNavigate();
  const { deleteStudent } = useStudentContext();

  if (!student) {
    return null;
  }

  const handleDelete = async (e) => {
    e.preventDefault(); // Prevent navigation to details
    e.stopPropagation();
    
    if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
      try {
        await deleteStudent(student.id);
        toast.success('Student deleted successfully');
      } catch (err) {
        toast.error('Failed to delete student');
      }
    }
  };

  const handleEdit = (e) => {
    e.preventDefault(); // Prevent navigation to details
    e.stopPropagation();
    navigate(`/students/${student.id}`, { state: { edit: true } });
  };

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
    <div className="student-card-container" onClick={() => navigate(`/students/${student.id}`)}>
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
          <div className="card-actions">
            <button 
              className="action-icon-btn edit-btn" 
              onClick={handleEdit}
              title="Edit Student"
            >
              ✏️
            </button>
            <button 
              className="action-icon-btn delete-btn" 
              onClick={handleDelete}
              title="Delete Student"
            >
              🗑️
            </button>
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
    </div>
  );
};

export default StudentCard;