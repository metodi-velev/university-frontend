import apiClient from './client';

const BASE_PATH = '/students';

export const studentApi = {
  // Get all students
  getAllStudents: async () => {
    console.log('📡 API Call: GET /students');
    try {
      const response = await apiClient.get(BASE_PATH);
      console.log('📡 API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('📡 API Error:', error);
      throw error;
    }
  },

  // Get student by ID
  getStudentById: async (id) => {
    console.log(`📡 API Call: GET /students/${id}`);
    const response = await apiClient.get(`${BASE_PATH}/${id}`);
    return response.data;
  },

  // Get student by email
  getStudentByEmail: async (email) => {
    console.log(`📡 API Call: GET /students/search/findStudentByEmail?email=${email}`);
    const response = await apiClient.get(`${BASE_PATH}/search/findStudentByEmail`, {
      params: { email },
    });
    return response.data;
  },

  // Create new student
  createStudent: async (studentData) => {
    console.log('📡 API Call: POST /students', studentData);
    const response = await apiClient.post(BASE_PATH, studentData);
    return response.data;
  },
};