import axios from 'axios';
import { baseURL } from '../constants';

export const getPostsByUserId = async (userId) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${baseURL}/posts/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching posts for user with ID ${userId}:`, error);
        throw error;
    }
}