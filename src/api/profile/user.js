import axios from 'axios';
import { baseURL } from '../constants';

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