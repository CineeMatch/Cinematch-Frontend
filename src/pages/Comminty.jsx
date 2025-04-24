import { Box } from '@mui/material'
import React from 'react'
import MeesageCard from '../components/community/MessageCard.jsx'
import CategoriesBar from '../components/community/CategoriesBar.jsx'
import { useState } from 'react'

export default function Comminty() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

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
        <MeesageCard isSidebarOpen={isSidebarOpen}/>
        <CategoriesBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
    </Box>
  )
}
