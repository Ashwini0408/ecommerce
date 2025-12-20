import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import type { ApiError } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8090/api';

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Attach JWT token to every request
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('authToken');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error: AxiosError) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} ${response.config.url}`);
    return response;
  },
  (error: AxiosError<ApiError>) => {
    if (error.response) {
      const { status, data } = error.response;
      
      console.error(`[API Error] ${status}`, data);
      
      // Handle 401 Unauthorized - Token expired or invalid
      if (status === 401) {
        console.warn('Unauthorized access - Clearing auth token');
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        
        // Redirect to login page
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
      
      // Handle 403 Forbidden
      if (status === 403) {
        console.warn('Forbidden - Insufficient permissions');
      }
      
      // Handle 404 Not Found
      if (status === 404) {
        console.warn('Resource not found');
      }
      
      // Handle 500 Internal Server Error
      if (status === 500) {
        console.error('Server error - Please try again later');
      }
      
      return Promise.reject(data);
    } else if (error.request) {
      // Request was made but no response received
      console.error('[API Error] No response received', error.request);
      return Promise.reject({
        message: 'Network error - Please check your connection',
        status: 0,
      });
    } else {
      // Something happened in setting up the request
      console.error('[API Error] Request setup error', error.message);
      return Promise.reject({
        message: error.message || 'An unexpected error occurred',
        status: 0,
      });
    }
  }
);

export default axiosInstance;