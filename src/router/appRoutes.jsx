import React from "react";
import { Routes, Route } from "react-router-dom";
import FavoritesPage from "../pages/FavoritesPage";
import MainPage from "../pages/MainPage";
import Layout from "../components/shared/Layout";
import WishlistPage from "../pages/WishlistPage";
import WatchedPage from "../pages/WatchedPagecopy";
import ChallengeQuestionModal from "../components/Challenge/ChallengeQuestionModal";
import ChallengeQuestionStarterModal from "../components/Challenge/ChallengeQuestionStarterModal";

const AppRoutes = () => {
return (
    <Routes> 
    <Route path="/home" element={<Layout><MainPage/></Layout>} />
    <Route path="/favorites" element={<Layout><FavoritesPage/></Layout>} />
    <Route path="/wishlist" element={<Layout><WishlistPage/></Layout>} />
    <Route path="/watched" element={<Layout><WatchedPage/></Layout>} />
    <Route path="/modal" element={<ChallengeQuestionModal/>}/>
    <Route path="/modalQ" element={<ChallengeQuestionStarterModal/>}/>


</Routes>
)
}
export default AppRoutes;