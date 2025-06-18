import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function ChallengeQuestionModal() {
  const movieName = "CHRONICLE";

  const [questions] = useState([
    "What is the capital of France?",
    "Who directed CHRONICLE?",
    "What year was CHRONICLE released?"
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

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
          paddingTop: '40px',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: 'column'
        }}
      >
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

        <Box
          sx={{
            background: 'linear-gradient(to bottom, #202020, #121212)',
            padding: 4,
            borderRadius: 2,
            color: 'white',
            boxShadow: '0 0 15px rgba(199, 188, 188, 0.4)',
            width: 550,
            height: 230,
          }}
        >
          {/* Başlık ve yön okları */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
            <IconButton
              onClick={() => setCurrentIndex(i => i - 1)}
              disabled={currentIndex === 0}
              sx={{ color: "white" }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>

            <Typography variant="h5" textAlign="center" fontWeight="bold">
              QUESTION {currentIndex + 1}
            </Typography>

            <IconButton
              onClick={() => setCurrentIndex(prev => prev + 1)}
              disabled={currentIndex >= questions.length - 1}
              sx={{ color: "white" }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>

          {/* Soru */}
          <Typography
            variant="body1"
            fontWeight="500"
            sx={{ textAlign: 'center', marginBottom: 4 }}
          >
            {questions[currentIndex]}
          </Typography>

          {/* Doğru/Yanlış ikonları */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            <IconButton>
              <CheckCircleIcon sx={{ fontSize: 50, color: 'limegreen' }} />
            </IconButton>
            <IconButton>
              <CancelIcon sx={{ fontSize: 50, color: 'red' }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
