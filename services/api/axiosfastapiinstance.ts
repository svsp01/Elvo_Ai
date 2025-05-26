import axios from "axios";

export const axiosFastApiInstance = axios.create({
  baseURL: process.env.FASTAPI_URL || 'http://localhost:8000',
  timeout: 30000, // 30 seconds timeout for calls
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging
axiosFastApiInstance.interceptors.request.use(
  (config) => {
    console.log(`FastAPI Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('FastAPI Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
axiosFastApiInstance.interceptors.response.use(
  (response) => {
    console.log(`FastAPI Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('FastAPI Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
