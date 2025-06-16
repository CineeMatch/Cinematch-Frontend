import axios from "axios";
import { baseURL } from "../constants";

export const getMovieTypeOnProfileByUserId = async (userId) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${baseURL}/movieType/on-profile/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
    catch (error) {
        console.error(`Error fetching movie types for user with ID ${userId}:`, error);
        throw error;
    }
};