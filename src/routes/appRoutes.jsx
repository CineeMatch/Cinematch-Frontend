import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainPage from '../pages/MainPage.jsx'
import FavoritesPage from '../pages/FavoritesPage.jsx'
import WishlistPage from '../pages/WishlistPage.jsx'
import WatchedPage from '../pages/WatchedPagecopy.jsx'
import ChallangeModal from '../modals/profile/ActiveChallengeModal.jsx'
import Comminty from '../pages/Comminty.jsx'
import CoMatch from '../pages/CoMatch.jsx'
import Layout from '../components/layout/Layout.jsx'
import MessageCard from '../components/community/MessageCard.jsx'
import ChallengeQuestionModal from '../modals/challenge/ChallangeQuestionModal.jsx'
import ChallengeQuestionStarterModal from '../modals/challenge/ChallengeQuestionStarterModal.jsx'
import RegisterPage from '../pages/Register.jsx'
import ProfilePage from '../pages/Profile.jsx'
import ChatPage from '../pages/ChatPage.jsx'
import Friends from '../pages/Friends.jsx'
import ForgetPasswordPage from '../pages/ForgetPasswordPage.jsx'
import LoginPage from '../pages/Login.jsx'
import Users from '../pages/Users.jsx'
import NewPasswordPage from '../pages/NewPasswordPage.jsx'

export default function appRoutes() {
  return (
    <Routes>
       <Route index element={<LoginPage />} />
       <Route path="/home" element={<Layout><MainPage /></Layout>} />
       <Route path="/activeChallange" element={<Layout><ChallangeModal /></Layout>} />
       <Route path="/messageCard" element={<MessageCard />} />
       <Route path="/community" element={<Layout><Comminty /></Layout>} /> 
       <Route path="/comatch" element={<Layout><CoMatch/></Layout>} />
       <Route path="/favorites" element={<Layout><FavoritesPage/></Layout>} />
       <Route path="/wishlist" element={<Layout><WishlistPage/></Layout>} />
       <Route path="/watched" element={<Layout><WatchedPage/></Layout>} />
       <Route path="/modal" element={<ChallengeQuestionModal/>}/>
       <Route path="/modalQ" element={<ChallengeQuestionStarterModal/>}/>
       <Route path="/register" element={<RegisterPage />} />
       <Route path="/chat" element={<Layout><ChatPage /></Layout>} />
       <Route path="/friends" element={<Layout><Friends /></Layout>} />
       <Route path="/users" element={<Users />} />
       <Route path="/profile/:userId?" element={<Layout><ProfilePage /></Layout>} />
       <Route path="/newPassword" element={<NewPasswordPage />} />
        {/* page or modal test routes */}
        <Route path="/forgetPassword" element={<ForgetPasswordPage />} />
    </Routes>
  )
}
