import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    timeout: 10000,
    headers: {
    "Content-Type": "application/json",
    
    // 👇 THIS HEADER IS THE KEY FIX
    "ngrok-skip-browser-warning": "true",
  },
});

export default api;
