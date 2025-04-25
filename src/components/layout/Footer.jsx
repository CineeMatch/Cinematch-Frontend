import React from 'react';
import { Box, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box
      sx={{
        width: '95.7%',
        height: '60px',
        backgroundColor: 'black',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        direction:"column",
        paddingX: 4,
        paddingY: 2,
        fontSize: '14px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Typography sx={{ fontWeight: 'bold', color: '#cfcfcf' }}>
        © 2025 CINEMATCH
      </Typography>

      {/* Sağ kısım - linkler */}
      <Box sx={{ display: 'flex', gap: 4 }}>
        <Link href="#" underline="none" sx={{ '&:hover': { textDecoration: 'underline' } }}>
          Terms
        </Link>
        <Link href="#" underline="none" sx={{ '&:hover': { textDecoration: 'underline' } }}>
          Contact Us
        </Link>
        <Link href="#" underline="none" sx={{ color: 'gray' }}>
          Support
        </Link>
        <Link href="#" underline="none" sx={{ '&:hover': { textDecoration: 'underline' } }}>
          Help
        </Link>
        <Link href="#" underline="none" sx={{  '&:hover': { textDecoration: 'underline' } }}>
          About US
        </Link>
      </Box>
    </Box>
  );
}
