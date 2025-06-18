import axios from "axios";
import { baseURL } from "../constants";
// toast or another notification library will implemented in the future

export const login = async (userData) => {
    try {
        const response = await axios.post(`${baseURL}/login`, userData);
        const token = response.data.token;
        localStorage.setItem("authToken", token);
        return response.data;
    } catch (error) {
        // console.error("Login error:", error);
        throw error;
    }
}

export const register = async (userData) => {
    try {
        const response = await axios.post(`${baseURL}/register`, userData);
        // const token = response.data.token;
        // localStorage.setItem("authToken", token);,
        console.log("Register response:", response.data);
        return response.data;
    } catch (error) {
        // console.error("Register error:", error);
        throw error;
    }
}

export const forgetPassword = async (email) => {
    try {
        const response = await axios.post(`${baseURL}/forgetPassword`, 
            { email });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const resetPassword = async (userId, newPassword) => {
    try {
        console.log("Resetting password for user:", userId);
        console.log("New password:", newPassword);
        const response = await axios.post(`${baseURL}/resetPassword`, 
            {userId, newPassword });
        return response.data;
    } catch (error) {
        throw error;
    }
}