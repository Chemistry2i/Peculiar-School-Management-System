import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/teachers';

// Create axios instance with default config
const teacherAPI = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
teacherAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const teacherService = {
  /**
   * Get teacher by ID
   */
  getTeacherById: (teacherId) => {
    return teacherAPI.get(`/${teacherId}`);
  },

  /**
   * Get teacher's subjects
   */
  getTeacherSubjects: (teacherId) => {
    return teacherAPI.get(`/${teacherId}/subjects`);
  },

  /**
   * Get teacher's classes
   */
  getTeacherClasses: (teacherId) => {
    return teacherAPI.get(`/${teacherId}/classes`);
  },

  /**
   * Get teacher's attendance records
   */
  getTeacherAttendance: (teacherId) => {
    return teacherAPI.get(`/${teacherId}/attendance`);
  },

  /**
   * Get teacher's reports
   */
  getTeacherReports: (teacherId) => {
    return teacherAPI.get(`/${teacherId}/reports`);
  },

  /**
   * Get all active teachers
   */
  getActiveTeachers: () => {
    return teacherAPI.get('?activeOnly=true');
  },

  // ==================== DATA ACCESS CONTROL - FILTERED ENDPOINTS ====================

  /**
   * Get only classes assigned to the current teacher
   * Restricted to teacher's assigned classes only (data access control)
   */
  getMyAssignedClasses: (teacherId) => {
    return teacherAPI.get(`/${teacherId}/my-classes`);
  },

  /**
   * Get attendance records for only the current teacher's assigned classes
   * Restricted to teacher's assigned classes only (data access control)
   */
  getMyClassesAttendance: (teacherId) => {
    return teacherAPI.get(`/${teacherId}/my-attendance`);
  },

  /**
   * Get grades for only the current teacher's assigned classes
   * Restricted to teacher's assigned classes only (data access control)
   */
  getMyClassesGrades: (teacherId) => {
    return teacherAPI.get(`/${teacherId}/my-grades`);
  },
};

export default teacherService;
