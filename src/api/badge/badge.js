import axios from "axios";
import { baseURL } from "../constants";

export const createBadge = async (badgeData) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.post(`${baseURL}/badge/create/frontend`, badgeData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to create badge:", error);
        throw error; // Rethrow the error for further handling
    }
}

export const getBadgesByUserId = async (userId) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${baseURL}/user-badge/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to get badge by user ID:", error);
        throw error; // Rethrow the error for further handling
    }
}