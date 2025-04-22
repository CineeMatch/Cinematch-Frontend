import React, { useState } from 'react';
import { Box, Typography, IconButton, TextField, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';

export default function ChallengeQuestionStarterModal() {
  const movieName = "CHRONICLE";
  const [selectedAnswer, setSelectedAnswer] = useState(null); // null, true, false

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height: 400,
    boxShadow: 24,
    p: 0,
    border: 'none',
    background: 'linear-gradient(to bottom,rgb(55, 9, 9),rgb(0, 0, 0))',
  };

  return (
    <Box sx={{ ...style }}>
      <Box
        sx={{
          margin: '0 auto',
          mt: 4,
          position: 'relative',
          paddingTop: '20px',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection:"column"
        }}
      >
        {/* Arka plan yazısı */}
        <Typography
          variant="h1"
          sx={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '70px',
            fontWeight: 'bold',
            color: 'rgba(255, 255, 255, 0.05)',
          }}
        >
          {movieName}
        </Typography>

        {/* Kart kutusu */}
        <Box
          sx={{
            background: 'linear-gradient(to bottom, #202020, #121212)',
            padding: 4,
            borderRadius: 2,
            color: 'white',
            alignContent:"center",
            boxShadow: '0 0 15px rgba(199, 188, 188, 0.4)',
            width: 550,
            height: 230,
          }}
        >
          {/* Başlık */}
          <Typography variant="h5" textAlign="center" fontWeight="bold" mb={3}   multiline
  rows={4}>
            QUESTION NUMBER
          </Typography>

          <TextField
  id="outlined-basic"
  label="Question"
  variant="outlined"
  fullWidth
  multiline
  rows={4} // Yüksekliği ayarlar (satır sayısı)
  sx={{
    '& .MuiInputBase-input': {
      color: 'white',
    },
    '& .MuiInputLabel-root': {
      color: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
  }}
/>

          {/* İkonlar */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 6,
              mt: 2,
            }}
          >
            <IconButton onClick={() => setSelectedAnswer(true)}>
              <CheckCircleIcon
                sx={{
                  fontSize: 50,
                  color: selectedAnswer === true ? 'white' : 'rgb(134, 128, 128)',
                }}
              />
            </IconButton>
            <IconButton onClick={() => setSelectedAnswer(false)}>
              <CancelIcon
                sx={{
                  fontSize: 50,
                  color: selectedAnswer === false ? 'white' : 'rgb(134, 128, 128)',
                }}
              />
            </IconButton>
          </Box>
        </Box>
        
        <Button sx={{
          
              color:"rgb(134, 128, 128)",
              '&:hover': {
                color: 'white',}
            }}>Submit</Button>
      </Box>
      <IconButton
  sx={{
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'white',
    color: 'black',
    '&:hover': {
      backgroundColor: 'gray',
      color: 'white',
    },
  }}
>
  <AddIcon />
</IconButton>
      
      </Box>
   
  );
}
