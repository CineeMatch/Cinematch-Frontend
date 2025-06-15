import axios from 'axios';
import { baseURL } from '../constants';

export const getAllUsers = async () => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${baseURL}/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw error;
    }
}

export const getActiveUser = async (userId) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${baseURL}/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
}

export const getUserById = async (userId) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${baseURL}/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching user with ID ${userId}:`, error);
        throw error;
    }
}

export const uploadUserAvatar = async (imageData) => {
    try {
        console.log("base64Image:", imageData);
        const token = localStorage.getItem('authToken');
        const response = await axios.post(`${baseURL}/user/upload/avatar`, imageData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading user avatar:', error);
        throw error;
    }
};
