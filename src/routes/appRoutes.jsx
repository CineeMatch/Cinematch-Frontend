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
import ChallengeQuestionModal from '../modals/challenge/ChallengeQuestionModal.jsx'
import WatchedPage from '../pages/WatchedPage.jsx'
import NewUserWatchedPage from '../pages/NewUserWatchedPage.jsx'

export default function appRoutes() {
  return (
    <Routes>
          <Route index element={<Layout><MainPage /></Layout>} />
          <Route path="/activeChallange" element={<Layout><ChallangeModal /></Layout>} />
          <Route path="/community" element={<Layout><Community /></Layout>} /> 
          <Route path="/comatch" element={<Layout><CoMatch/></Layout>} />
          <Route path="/favorites" element={<Layout><FavoritesPage/></Layout>} />
          <Route path="/wishlist" element={<Layout><WishlistPage/></Layout>} />
          <Route path="/watched" element={<Layout><WatchedPage/></Layout>} />
          <Route path="/modal" element={<ChallengeQuestionModal/>}/>
          <Route path="/modalQ" element={<ChallengeQuestionStarterModal/>}/>
          <Route path="/newUserWatched" element={<Layout ><NewUserWatchedPage /></Layout>}/>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

    </Routes>
  )
}