import axiosInstance from './axios';
import { AuthResponse, LoginRequest, SignUpRequest } from '../types';

export const authApi = {
  // Login
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  // Sign Up
  signup: async (userData: SignUpRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>('/auth/signup', userData);
    return response.data;
  },

  // Logout
  logout: async (): Promise<void> => {
    await axiosInstance.post('/auth/logout');
  },

  // Verify token (optional - for checking if token is still valid)
  verifyToken: async (): Promise<boolean> => {
    try {
      await axiosInstance.get('/auth/verify');
      return true;
    } catch (error) {
      return false;
    }
  },
};

export default authApi;