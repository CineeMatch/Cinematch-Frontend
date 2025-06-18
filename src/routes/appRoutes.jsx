import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '../components/layout/Layout.jsx'
import MainPage from '../pages/MainPage.jsx'
import Community from '../pages/Community.jsx'
import CoMatch from '../pages/CoMatch.jsx'
import FavoritesPage from '../pages/FavoritesPage.jsx'
import WishlistPage from '../pages/WishlistPage.jsx'
import ChallengeQuestionStarterModal from '../modals/challenge/ChallengeQuestionStarterModal.jsx'
import ChallangeModal from '../modals/profile/ActiveChallengeModal.jsx'
import LoginPage from '../pages/Login.jsx'
import RegisterPage from '../pages/Register.jsx'
import ProfilePage from '../pages/Profile.jsx'
import ChatPage from '../pages/ChatPage.jsx'
import Friends from '../pages/Friends.jsx'
import ForgetPasswordPage from '../pages/ForgetPasswordPage.jsx'
import ChallengeQuestionModal from '../modals/challenge/ChallangeQuestionModal.jsx'
import WatchedPage from '../pages/WatchedPage.jsx'
import Users from '../pages/Users.jsx'
import NewPasswordPage from '../pages/NewPasswordPage.jsx'
import PostPage from '../pages/PostPage.jsx'
import CreateBadgeModal from '../modals/badge/CreateBadgeModal.jsx'

export default function appRoutes() {
  return (
    <Routes>
        <Route index element={<LoginPage />} />
        <Route path="/home" element={<Layout><MainPage /></Layout>} />
        <Route path="/activeChallange" element={<Layout><ChallangeModal /></Layout>} />
        <Route path="/community" element={<Layout><Community /></Layout>} /> 
        <Route path="/comatch" element={<Layout><CoMatch/></Layout>} />
        <Route path="/favorites" element={<Layout><FavoritesPage/></Layout>} />
        <Route path="/wishlist" element={<Layout><WishlistPage/></Layout>} />
        <Route path="/watched" element={<Layout><WatchedPage/></Layout>} />
        <Route path="/modal" element={<Layout><ChallengeQuestionModal/></Layout>}/>
        <Route path="/modalQ" element={<Layout><ChallengeQuestionStarterModal/></Layout>}/>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile/:userId?" element={<Layout><ProfilePage /></Layout>} />
        <Route path="/chat" element={<Layout><ChatPage /></Layout>} />
        <Route path="/friends" element={<Layout><Friends /></Layout>} />
        <Route path="/users" element={<Layout><Users /></Layout>} />
        <Route path="/newPassword" element={<NewPasswordPage />} />
        <Route path="/posts/:userId?" element={<Layout><PostPage /></Layout>} />

        {/* Secret/Admin route*/}
        <Route path="/createBadge" element={<CreateBadgeModal />} />

        {/* page or modal test routes */}
        <Route path="/forgetPassword" element={<ForgetPasswordPage />} />
    </Routes>
  )
}
