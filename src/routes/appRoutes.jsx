import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainPage from '../pages/MainPage.jsx'
import FavoritesPage from '../pages/FavoritesPage.jsx'
import WishlistPage from '../pages/WishlistPage.jsx'
import WatchedPage from '../pages/WatchedPage.jsx'
import ActiveChallengeModal from '../modals/profile/ActiveChallengeModal.jsx'
import Community from '../pages/Community.jsx'
import CoMatch from '../pages/CoMatch.jsx'
import Layout from '../components/layout/Layout.jsx'
import ChallengeQuestionModal from '../modals/challenge/ChallengeQuestionModal.jsx'
import ChallengeQuestionStarterModal from '../modals/challenge/ChallengeQuestionStarterModal.jsx'
import RegisterPage from '../pages/Register.jsx'
import ProfilePage from '../pages/Profile.jsx'
import ChatPage from '../pages/ChatPage.jsx'
import Friends from '../pages/Friends.jsx'
import ForgetPasswordPage from '../pages/ForgetPasswordPage.jsx'
import LoginPage from '../pages/Login.jsx'
import Users from '../pages/Users.jsx'
import ResetPasswordPage from '../pages/ResetPasswordPage.jsx'
import PostPage from '../pages/PostPage.jsx'
import CreateBadgeModal from '../modals/badge/CreateBadgeModal.jsx'
import NewUserWatchedPage from '../pages/NewUserWatchedPage.jsx'

export default function appRoutes() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="/home" element={<Layout><MainPage /></Layout>} />
      <Route path="/activeChallenge" element={<Layout><ActiveChallengeModal /></Layout>} />
      <Route path="/community" element={<Layout><Community /></Layout>} /> 
      <Route path="/comatch" element={<Layout><CoMatch/></Layout>} />
      <Route path="/favorites" element={<Layout><FavoritesPage/></Layout>} />
      <Route path="/wishlist" element={<Layout><WishlistPage/></Layout>} />
      <Route path="/watched" element={<Layout><WatchedPage/></Layout>} />
      <Route path="/modal" element={<ChallengeQuestionModal/>}/>
      <Route path="/modalQ" element={<ChallengeQuestionStarterModal/>}/>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile/:userId?" element={<Layout><ProfilePage /></Layout>} />
      <Route path="/chat" element={<Layout><ChatPage /></Layout>} />
      <Route path="/friends" element={<Layout><Friends /></Layout>} />
      <Route path="/users" element={<Users />} />
      <Route path="/posts/:userId?" element={<Layout><PostPage /></Layout>} />
      <Route path="/reset-password/:id" element={<ResetPasswordPage />} />
      <Route path="/forgetPassword" element={<ForgetPasswordPage />} />
      <Route path="/newUserWatched" element={<Layout><NewUserWatchedPage /></Layout>} />

       {/* Secret/Admin route*/}
      <Route path="/createBadge" element={<CreateBadgeModal />} />
    </Routes>
  )
}
