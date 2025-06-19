import axios from 'axios';
import { baseURL } from '../constants';

export const getChallengeByUser = async () => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${baseURL}/challenges/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching challenges by user:', error);
        throw error;
    }
};

export const deleteChallenge = async (challengeId) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.delete(`${baseURL}/challenge/delete/${challengeId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error deleting challenge with ID ${challengeId}:`, error);
        throw error;
    }
};

export const updateChallengeStatusAccepted = async (challengeId) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.put(`${baseURL}/challenge/update/accepted/${challengeId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating challenge status to accepted for ID ${challengeId}:`, error);
        throw error;
    }
};