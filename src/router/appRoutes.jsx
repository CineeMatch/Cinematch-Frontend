import React from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "../pages/profile/Profile.jsx";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import ChatPage from "../pages/chat/ChatPage.jsx";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat" element={<ChatPage />} />
        </Routes>
    )
}

export default AppRoutes;