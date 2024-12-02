import API from './Api';
import { message } from 'antd';

// Regular user login
export const getlogin = async (credentials) => {
    try {
        const response = await API.post('api/login/', credentials, {
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.data.access) {
            throw new Error('Invalid response format');
        }
        return response.data;
    } catch (err) {
        const errorMessage = err.response?.data?.message || 'Login failed';
        message.error(errorMessage);
        throw err;
    }
};

// Seller specific APIs
export const loginSeller = async (credentials) => {
    try {
        const response = await API.post('account/seller_login', credentials, {
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.data.access) {
            throw new Error('Invalid response format');
        }
        return response.data;
    } catch (err) {
        const errorMessage = err.response?.data?.message || 'Login failed';
        message.error(errorMessage);
        throw err;
    }
};

// Admin specific APIs
export const loginAdmin = async (credentials) => {
    try {
        const response = await API.post('account/admin/login/', credentials, {
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.data.access) {
            throw new Error('Invalid response format');
        }
        return response.data;
    } catch (err) {
        const errorMessage = err.response?.data?.message || 'Login failed';
        message.error(errorMessage);
        throw err;
    }
};

// Registration APIs
export const sellerRegister = async (values) => {
    try {
        const response = await API.post('account/seller_reg', values, {
            headers: { 'Content-Type': 'application/json' }
        });
        
        return {
            status: 'success',
            data: response.data,
            message: 'Registration successful!'
        };
    } catch (err) {
        if (err.response?.data) {
            throw err;
        }
        throw new Error('Registration failed. Please try again later.');
    }
};

// User Registration API
export const registerUser = async (values) => {
    
    try {
        const response = await API.post('api/signup/', values, {
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.data) {
            message.success('Registration successful!');
            return response.data;
        }
        throw new Error('Invalid response format');
    } catch (err) {
        const errorMessage = err.response?.data?.message || 'Registration failed';
        message.error(errorMessage);
        throw err;
    }
};

// Token refresh API
export const refreshToken = async (refresh_token) => {
    try {
        const response = await API.post('account/token/refresh/', {
            refresh: refresh_token
        });
        return response.data;
    } catch (err) {
        console.error('Token refresh failed:', err);
        throw err;
    }
};



