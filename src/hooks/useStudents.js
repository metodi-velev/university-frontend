import { useState, useEffect, useCallback } from 'react';
import { studentApi } from '../api/studentApi';

export const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchEmail, setSearchEmail] = useState('');

  const fetchAllStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await studentApi.getAllStudents();
      setStudents(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch students');
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchStudentByEmail = useCallback(async (email) => {
    if (!email.trim()) {
      await fetchAllStudents();
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await studentApi.getStudentByEmail(email);
      setStudents(data);
      setSearchEmail(email);
    } catch (err) {
      if (err.response?.status === 404) {
        setStudents([]);
      } else {
        setError(err.response?.data?.message || 'Failed to search students');
        console.error('Error searching students:', err);
      }
    } finally {
      setLoading(false);
    }
  }, [fetchAllStudents]);

  const createStudent = useCallback(async (studentData) => {
    setLoading(true);
    setError(null);
    try {
      const newStudent = await studentApi.createStudent(studentData);
      // Refresh the list based on current view
      if (searchEmail) {
        await searchStudentByEmail(searchEmail);
      } else {
        await fetchAllStudents();
      }
      return newStudent;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create student';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [fetchAllStudents, searchStudentByEmail, searchEmail]);

  const clearSearch = useCallback(() => {
    setSearchEmail('');
    fetchAllStudents();
  }, [fetchAllStudents]);

  useEffect(() => {
    fetchAllStudents();
  }, [fetchAllStudents]);

  return {
    students,
    loading,
    error,
    searchEmail,
    fetchAllStudents,
    searchStudentByEmail,
    createStudent,
    clearSearch,
    setError,
  };
};