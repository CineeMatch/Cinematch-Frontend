import axios from "axios";
import { baseURL } from "../constants";

export const createCoMatchSuggestion = async () => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.post(`${baseURL}/comatchsuggestion/create`,{},
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }catch (error) {
        console.error(`Error creating co-match suggestion for user with ID`, error);
        throw error;
    }
};