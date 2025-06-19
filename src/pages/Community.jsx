import { Box } from '@mui/material'
import React from 'react'
import MessageCard from '../components/community/MessageCard.jsx'
import CategoriesBar from '../components/community/CategoriesBar.jsx'
import { useState } from 'react'

export default function Comminty() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); 

  return (
    <Box sx={{ 
        display: "flex",
        justifyContent:"spsace-between",
        alignItems: "flex-end",
        width: "100vw",
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.79), rgba(0, 0, 0, 0.5)),
    url(/images/main-Photoroom.png)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        gap: 2,
    }}>
        <MessageCard isSidebarOpen={isSidebarOpen} selectedCategoryId={selectedCategoryId}/>
        <CategoriesBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} onCategorySelect={setSelectedCategoryId}/>
    </Box>
  )
}

