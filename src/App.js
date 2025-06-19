import React from 'react'
import './App.css'
import { Toaster } from 'react-hot-toast'
import AppRoutes from './routes/appRoutes.jsx'

function App() {
  return (
    <div className="App">
      <Toaster position="top-center" />
      <AppRoutes />
    </div>
  )
}

export default App

