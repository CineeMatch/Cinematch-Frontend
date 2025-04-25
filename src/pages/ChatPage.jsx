import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatPage = () => {

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        backgroundImage: "url('/images/movie-background.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
      }}
    >
      {/* SOL PANEL */}
      <Box
        sx={{
          width: 300,
          bgcolor: 'rgba(0,0,0,0.85)',
          overflowY: 'auto',
          p: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Messages
        </Typography>
        <List>
          {[...Array(12)].map((_, index) => (
            <ListItem button key={index} sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText primary="Dreath" primaryTypographyProps={{ color: 'white' }} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* SAĞ PANEL */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          p: 2,
        }}
      >
        {/* ÜST BAR */}
        <Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            bgcolor: 'rgba(0,0,0,0.7)',
            p: 2,
            borderRadius: 2,
            mb: 3,
            width: '500',
          }}
        >
          <Avatar />
          <Typography variant="h6" fontWeight="bold">Dreath</Typography>
        </Box>
        </Box>

        {/* MESAJLAR */}
        <Box sx={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Gelen mesaj */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar />
            <Paper sx={{ bgcolor: 'rgba(196, 61, 55, 0.8)', px: 2, py: 1, borderRadius: 4 }}>
              <Typography color="white" fontWeight="bold">Message</Typography>
            </Paper>
          </Box>

          {/* Gelen mesaj */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar />
            <Paper sx={{ bgcolor: 'rgba(196, 61, 55, 0.8)', px: 2, py: 1, borderRadius: 4 }}>
              <Typography color="white" fontWeight="bold">Message</Typography>
            </Paper>
          </Box>

          {/* Giden mesaj */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
            <Paper sx={{ bgcolor: 'rgba(196, 61, 55, 0.8)', px: 2, py: 1, borderRadius: 4 }}>
              <Typography color="white" fontWeight="bold">Message</Typography>
            </Paper>
            <Avatar />
          </Box>

          {/* Giden mesaj */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
            <Paper sx={{ bgcolor: 'rgba(196, 61, 55, 0.8)', px: 2, py: 1, borderRadius: 4 }}>
              <Typography color="white" fontWeight="bold">Message</Typography>
            </Paper>
            <Avatar />
          </Box>
        </Box>

        {/* MESAJ GİRİŞİ */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'rgba(196, 61, 55, 0.9)',
            borderRadius: 10,
            p: 1,
            mt: 2,
          }}
        >
          <TextField
            placeholder="Write a message"
            variant="standard"
            fullWidth
            InputProps={{
              disableUnderline: true,
              sx: { color: 'white', pl: 2 },
            }}
          />
          <IconButton>
            <SendIcon sx={{ color: 'white' }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPage;
