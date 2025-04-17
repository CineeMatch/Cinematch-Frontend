import React from "react";
import { Routes, Route } from "react-router-dom";
import FavoritesPage from "../pages/FavoritesPage";
import MainPage from "../pages/MainPage";
import Layout from "../shared/Layout";
import WishlistPage from "../pages/WishlistPage";
import WatchedPage from "../pages/WatchedPagecopy";
const AppRoutes = () => {
return (
    <Routes> 
    <Route path="/home" element={<Layout><MainPage/></Layout>} />
    <Route path="/favorites" element={<Layout><FavoritesPage/></Layout>} />
    <Route path="/wishlist" element={<Layout><WishlistPage/></Layout>} />
    <Route path="/watched" element={<Layout><WatchedPage/></Layout>} />


</Routes>
)
}
export default AppRoutes;