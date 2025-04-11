import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CoMatch from '../pages/coMatch.jsx'
import ChallangeModal from '../modals/profile/activeChallangeModal.jsx'

export default function appRoutes() {
  return (
    <Routes>
       <Route index element={<CoMatch />} />
       <Route path="/activeChallange" element={<ChallangeModal />} />
    </Routes>
  )
}
