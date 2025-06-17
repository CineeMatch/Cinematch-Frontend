import { baseURL } from "../constants";
import axios from 'axios';

export const getLikesByPost = async (postId) => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('User token not found.');
            }
        const response = await axios.get(`${baseURL}/likes/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });
            return response.data;
    } catch (error) {
        console.error('Error fetching likes:', error);
        throw error;
    }
};

export const createLike = async (post_id) => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('User token not found.');
        }
        const response = await axios.post(`${baseURL}/like/create`, 
            {post_id}, 
            {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating like:', error);
        throw error;
    }
}

export const removeLike = async (postId) => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('User token not found.');
        }
        const response = await axios.delete(`${baseURL}/like/delete/${postId}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error removing like:', error);   
    }
}

export const getUserLikeonPost = async (postId) => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('User token not found.');
        }
        const response = await axios.get(`${baseURL}/like/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user like on post:', error);
        throw error;
    }
};
