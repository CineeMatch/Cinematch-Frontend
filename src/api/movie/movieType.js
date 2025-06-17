import axios from "axios";
import { baseURL } from "../constants";

export const getMovieTypeOnProfileByUserId = async (userId) => {
    try {
        const token = localStorage.getItem("authToken");
        console.log("Fetching movie types for user ID:", userId);
        const response = await axios.get(`${baseURL}/movieType/on-profile/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Movie types fetched:", response.data);
        return response.data;
    }
    catch (error) {
        console.error(`Error fetching movie types for user with ID ${userId}:`, error);
        throw error;
    }
};