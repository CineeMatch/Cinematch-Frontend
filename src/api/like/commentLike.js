import axios from "axios";
import { baseURL } from "../constants";

export const getCommentLikesByCommentId = async (comment_id) => {
    try{
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${baseURL}/commentlikes/${comment_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Gelen like verisi:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching comment likes:", error);
        throw error;
    }
};

export const createCommentLike = async (comment_id) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post(`${baseURL}/commentlike/create`, 
        { comment_id }, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error creating comment like:", error);
        throw error;
    }
};

export const deleteCommentLike = async (comment_id) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.delete(`${baseURL}/commentlike/delete/${comment_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting comment like:", error);
        throw error;
    }
};

export const getUserCommentLikeOnComment = async (comment_id) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${baseURL}/commentlike/currentUser/${comment_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user comment like:", error);
        throw error;
    }
};