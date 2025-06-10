import axios from 'axios';
import { baseURL } from '../constants';

export const getCurrentUserFriendsList = async () => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${baseURL}/friend/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            return response;
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching friends list:', error);
        throw error;
    }
}

export const addFriendByNickname = async (nickname) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post(`${baseURL}/friend/create`, { nickname }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding friend:', error);
        throw error;
    }
}