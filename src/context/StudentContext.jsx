import React, { createContext, useContext, useState, useCallback } from 'react';
import { studentApi } from '../api/studentApi';

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchEmail, setSearchEmail] = useState('');
  const [showForm, setShowForm] = useState(false);

  const fetchAllStudents = useCallback(async () => {
    console.log('🔄 Fetching all students...');
    setLoading(true);
    setError(null);
    try {
      const data = await studentApi.getAllStudents();
      console.log('✅ Students fetched:', data);
      setStudents(data);
      return data;
    } catch (err) {
      console.error('❌ Error fetching students:', err);
      setError(err.response?.data?.message || 'Failed to fetch students');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchStudentByEmail = useCallback(async (email) => {
    console.log('🔍 Searching for student by email:', email);
    if (!email.trim()) {
      await fetchAllStudents();
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await studentApi.getStudentByEmail(email);
      console.log('✅ Search results:', data);
      setStudents(data);
      setSearchEmail(email);
      return data;
    } catch (err) {
      console.error('❌ Error searching students:', err);
      if (err.response?.status === 404) {
        setStudents([]);
      } else {
        setError(err.response?.data?.message || 'Failed to search students');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchAllStudents]);

  const createStudent = useCallback(async (studentData) => {
    console.log('➕ Creating student:', studentData);
    setLoading(true);
    setError(null);
    try {
      const newStudent = await studentApi.createStudent(studentData);
      console.log('✅ Student created:', newStudent);
      await fetchAllStudents();
      setShowForm(false); // Close form after successful creation
      return newStudent;
    } catch (err) {
      console.error('❌ Error creating student:', err);
      const errorMessage = err.response?.data?.message || 'Failed to create student';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [fetchAllStudents]);

  const updateStudent = useCallback(async (id, studentData) => {
    console.log(`📝 Updating student ${id}:`, studentData);
    setLoading(true);
    setError(null);
    try {
      const updatedStudent = await studentApi.updateStudent(id, studentData);
      console.log('✅ Student updated:', updatedStudent);
      await fetchAllStudents();
      return updatedStudent;
    } catch (err) {
      console.error('❌ Error updating student:', err);
      const errorMessage = err.response?.data?.message || 'Failed to update student';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [fetchAllStudents]);

  const deleteStudent = useCallback(async (id) => {
    console.log(`🗑️ Deleting student ${id}`);
    setLoading(true);
    setError(null);
    try {
      await studentApi.deleteStudent(id);
      console.log('✅ Student deleted');
      await fetchAllStudents();
    } catch (err) {
      console.error('❌ Error deleting student:', err);
      const errorMessage = err.response?.data?.message || 'Failed to delete student';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [fetchAllStudents]);

  const clearSearch = useCallback(() => {
    console.log('🧹 Clearing search');
    setSearchEmail('');
    fetchAllStudents();
  }, [fetchAllStudents]);

  const toggleForm = useCallback(() => {
    setShowForm(prev => !prev);
  }, []);

  const openForm = useCallback(() => {
    setShowForm(true);
  }, []);

  const closeForm = useCallback(() => {
    setShowForm(false);
  }, []);

  const value = {
    students,
    loading,
    error,
    searchEmail,
    showForm,
    fetchAllStudents,
    searchStudentByEmail,
    createStudent,
    updateStudent,
    deleteStudent,
    clearSearch,
    toggleForm,
    openForm,
    closeForm,
    setError,
  };

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudentContext = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudentContext must be used within a StudentProvider');
  }
  return context;
};