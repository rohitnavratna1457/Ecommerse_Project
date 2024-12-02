import axios from "axios";
import { refreshUserToken } from '../utils/auth';

const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/',
    timeout: 5000,
});

// Request interceptor
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't tried to refresh token yet
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshed = await refreshUserToken();
                if (refreshed) {
                    // Retry the original request with new token
                    const token = localStorage.getItem('access');
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return API(originalRequest);
                }
            } catch (refreshError) {
                // If refresh fails, redirect to login
                localStorage.clear();
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default API;