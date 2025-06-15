import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '../components/layout/Layout.jsx'
import MainPage from '../pages/MainPage.jsx'
import Community from '../pages/Community.jsx'
import CoMatch from '../pages/CoMatch.jsx'
import FavoritesPage from '../pages/FavoritesPage.jsx'
import WishlistPage from '../pages/WishlistPage.jsx'
import ChallengeQuestionStarterModal from '../modals/challenge/ChallengeQuestionStarterModal.jsx'
import MessageCard from '../components/community/MessageCard.jsx'
import ChallangeModal from '../modals/profile/ActiveChallengeModal.jsx'
import LoginPage from '../pages/Login.jsx'
import RegisterPage from '../pages/Register.jsx'
import ProfilePage from '../pages/Profile.jsx'
import ChatPage from '../pages/ChatPage.jsx'
import Friends from '../pages/Friends.jsx'
import ForgetPasswordPage from '../pages/ForgetPasswordPage.jsx'
import ChallengeQuestionModal from '../modals/challenge/ChallangeQuestionModal.jsx'
import WatchedPage from '../pages/WatchedPage.jsx'
import EditProfileModal from '../modals/profile/EditProfileModal.jsx'
import ChatDeneme from '../components/ChatDeneme.jsx'
import Users from '../pages/Users.jsx'
import NewPasswordPage from '../pages/NewPasswordPage.jsx'

export default function appRoutes() {
  return (
    <Routes>
        <Route index element={<LoginPage />} />
        <Route path="/activeChallange" element={<Layout><ChallangeModal /></Layout>} />
        <Route path="/messageCard" element={<MessageCard />} />
        <Route path="/community" element={<Layout><Community /></Layout>} /> 
        <Route path="/comatch" element={<Layout><CoMatch/></Layout>} />
        <Route path="/favorites" element={<Layout><FavoritesPage/></Layout>} />
        <Route path="/wishlist" element={<Layout><WishlistPage/></Layout>} />
        <Route path="/watched" element={<Layout><WatchedPage/></Layout>} />
        <Route path="/modal" element={<ChallengeQuestionModal/>}/>
        <Route path="/modalQ" element={<ChallengeQuestionStarterModal/>}/>
        <Route path="/home" element={<MainPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile/:userId?" element={<ProfilePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/users" element={<Users />} />
        <Route path="/newPassword" element={<NewPasswordPage />} />
        <Route path="/EditProfileModal" element={<EditProfileModal/>} />

        {/* deneme */}
        <Route path="/chatdeneme" element={<ChatDeneme />} />

        {/* page or modal test routes */}
        <Route path="/forgetPassword" element={<ForgetPasswordPage />} />
    </Routes>
  )
}
