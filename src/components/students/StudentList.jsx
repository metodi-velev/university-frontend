import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStudentContext } from '../../context/StudentContext';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorAlert from '../common/ErrorAlert';
import StudentCard from './StudentCard';
import StudentSearch from './StudentSearch';
import StudentForm from './StudentForm';
import './StudentList.css';

const StudentList = () => {
  const {
    students,
    loading,
    error,
    clearSearch,
    searchEmail,
    showForm,
    fetchAllStudents,
    setError,
    toggleForm,
    closeForm
  } = useStudentContext();

  // Load students when component mounts
  useEffect(() => {
    console.log('StudentList mounted, fetching students...');
    fetchAllStudents();
  }, [fetchAllStudents]);

  // Also reload when coming back to this page
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('Page became visible, refreshing students...');
        fetchAllStudents();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchAllStudents]);

  if (loading && students.length === 0) {
    return <LoadingSpinner size="large" />;
  }

  return (
    <div className="student-list-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <span className="title-icon">👨‍🎓</span>
            Students
          </h1>
          <p className="page-subtitle">
            {searchEmail
              ? `Showing results for "${searchEmail}"`
              : `${students.length} student${students.length !== 1 ? 's' : ''} enrolled`}
          </p>
        </div>
        <div className="header-actions">
          <motion.button
            className="btn btn-secondary btn-sm"
            onClick={() => {
              console.log('Manual refresh clicked');
              fetchAllStudents();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>🔄</span> Refresh
          </motion.button>
          <motion.button
            className="btn btn-primary"
            onClick={toggleForm}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showForm ? '✕ Close Form' : '➕ Add New Student'}
          </motion.button>
        </div>
      </div>

      {error && <ErrorAlert message={error} onClose={() => setError(null)} />}

      <div className="controls-section">
        <StudentSearch onClear={clearSearch} />
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="form-section"
          >
            <StudentForm onSuccess={() => {
              closeForm();
              fetchAllStudents();
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="student-grid">
        {students.length === 0 ? (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="empty-state-icon">📚</div>
            <h3>No students found</h3>
            <p>{searchEmail ? 'Try a different email address' : 'Start by adding your first student'}</p>
            {searchEmail && (
              <button className="btn btn-secondary" onClick={clearSearch}>
                Clear Search
              </button>
            )}
            {!searchEmail && (
              <button className="btn btn-primary" onClick={toggleForm}>
                Add Your First Student
              </button>
            )}
          </motion.div>
        ) : (
          students.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <StudentCard student={student} />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentList;