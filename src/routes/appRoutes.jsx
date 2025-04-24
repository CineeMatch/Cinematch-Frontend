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

export default function appRoutes() {
  return (
    <Routes>
       <Route index element={<Layout><CoMatch /></Layout>} />
       <Route path="/activeChallange" element={<Layout><ChallangeModal /></Layout>} />
       <Route path="/messageCard" element={<MessageCard />} />
       <Route path="/community" element={<Comminty />} /> 
       <Route path="/home" element={<Layout><MainPage/></Layout>} />
       <Route path="/favorites" element={<Layout><FavoritesPage/></Layout>} />
       <Route path="/wishlist" element={<Layout><WishlistPage/></Layout>} />
       <Route path="/watched" element={<Layout><WatchedPage/></Layout>} />
       <Route path="/modal" element={<ChallengeQuestionModal/>}/>
       <Route path="/modalQ" element={<ChallengeQuestionStarterModal/>}/>
    </Routes>
  )
}
