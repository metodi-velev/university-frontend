import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { studentApi } from '../../api/studentApi';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorAlert from '../common/ErrorAlert';
import './StudentDetails.css';

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    if (id) {
      fetchStudent();
    }
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} onClose={() => navigate('/')} />;
  if (!student) return <ErrorAlert message="Student not found" onClose={() => navigate('/')} />;

  return (
    <div className="student-details-container">
      <button className="btn btn-secondary" onClick={() => navigate('/')}>
        ← Back to List
      </button>
      
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
    </div>
  );
};

export default StudentDetails;