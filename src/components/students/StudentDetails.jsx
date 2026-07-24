import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { studentApi } from '../../api/studentApi';
import { useStudentContext } from '../../context/StudentContext';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorAlert from '../common/ErrorAlert';
import StudentForm from './StudentForm';
import { toast } from 'react-toastify';
import './StudentDetails.css';

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { deleteStudent } = useStudentContext();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchStudent = async () => {
    try {
      setLoading(true);
      const data = await studentApi.getStudentById(id);
      setStudent(data);
    } catch (err) {
      setError('Failed to load student details');
      console.error('Error fetching student:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchStudent();
      
      // If we came from the card "Edit" button
      if (location.state?.edit) {
        setIsEditing(true);
      }
    }
  }, [id, location.state]);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
      try {
        await deleteStudent(id);
        toast.success('Student deleted successfully');
        navigate('/');
      } catch (err) {
        toast.error('Failed to delete student');
      }
    }
  };

  const handleUpdateSuccess = () => {
    setIsEditing(false);
    fetchStudent();
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} onClose={() => navigate('/')} />;
  if (!student) return <ErrorAlert message="Student not found" onClose={() => navigate('/')} />;

  return (
    <div className="student-details-container">
      <div className="header-actions-row">
        <button className="btn btn-secondary" onClick={() => navigate('/')}>
          ← Back to List
        </button>
        <div className="action-buttons">
          <button className="btn btn-primary" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancel Edit' : 'Edit Student'}
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete Student
          </button>
        </div>
      </div>
      
      {isEditing ? (
        <div className="edit-form-wrapper">
          <StudentForm 
            initialValues={student} 
            onSuccess={handleUpdateSuccess} 
            onCancel={() => setIsEditing(false)} 
          />
        </div>
      ) : (
        <div className="student-details-card">
          <div className="details-header">
            <div className="details-avatar">
              {student.name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)}
            </div>
            <div className="details-title">
              <h1>{student.name}</h1>
              <p className="details-subtitle">Student ID: #{student.id}</p>
            </div>
          </div>

          <div className="details-body">
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">📧 Email Address</span>
                <span className="detail-value">{student.email}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">🎂 Age</span>
                <span className="detail-value">{student.age} years old</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">📅 Joined</span>
                <span className="detail-value">
                  {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDetails;