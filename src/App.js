import React from 'react'
import './App.css'
import { ToastContainer } from 'react-toastify'
import AppRoutes from './routes/AppRoutes.jsx'

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-center" 
      toastStyle={{
      marginTop: "30%",
      marginLeft: "50%",
    }}
    bodyStyle={{
    textAlign: "center" }} />
      <AppRoutes />
    </div>
  )
}

export default App

