import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // This will fetch the base URL from the environment variable
  headers: {
    'Content-Type': 'application/json', // Default content type
  },
});

// Request Interceptor: Add Authorization header if token exists
axiosInstance.interceptors.request.use(
  (config) => {
    // Here, you can add authorization tokens or any other common headers
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null; // Check for token in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Optionally, handle token expiration or unauthorized errors
      // Redirect user to login page or refresh token
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
