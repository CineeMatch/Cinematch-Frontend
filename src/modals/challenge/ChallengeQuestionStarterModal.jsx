import { useState, useEffect } from 'react';
import {
  Box, Typography, IconButton, TextField, Button
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function ChallengeQuestionStarterModal() {
  const movieName = "CHRONICLE";

  const [questions, setQuestions] = useState([{ text: "", answer: null }]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const current = questions[currentIndex];

  // Değişikliklerde güncel soruyu güncelle
  const updateCurrentQuestion = (updatedFields) => {
    setQuestions(prev => {
      const updated = [...prev];
      updated[currentIndex] = {
        ...updated[currentIndex],
        ...updatedFields
      };
      return updated;
    });
  };

  const handleAddNewQuestion = () => {
    if (current.text.trim() === "" || current.answer === null) return;
    setQuestions(prev => [...prev, { text: "", answer: null }]);
    setCurrentIndex(questions.length); // yeni index
  };

  const handleDeleteQuestion = () => {
    if (questions.length === 1) return;
    const updated = questions.filter((_, i) => i !== currentIndex);
    setQuestions(updated);
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : 0));
  };

  const handleSubmit = () => {
    console.log("Submitted questions:", questions);
  };

  const anyInvalid = questions.some(q => q.text.trim() === "" || q.answer === null);

  const isDisabled = current.text.trim() === "" || current.answer === null || anyInvalid;

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height: 450,
    boxShadow: 24,
    p: 0,
    border: 'none',
    background: 'linear-gradient(to bottom,rgb(55, 9, 9),rgb(0, 0, 0))',
  };

  return (
    <Box sx={style}>
      <Box
        sx={{
          margin: '0 auto',
          mt: 4,
          position: 'relative',
          paddingTop: '20px',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column"
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
            height: 250,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mt: 3 }}>
            <IconButton
              onClick={() => setCurrentIndex(prev => prev - 1)}
              sx={{ color: "white" }}
              disabled={currentIndex === 0}
            >
              <ArrowBackIosNewIcon />
            </IconButton>

            <Typography variant="h5" textAlign="center" fontWeight="bold" mb={0}>
              QUESTION {currentIndex + 1}
            </Typography>

            <IconButton
              onClick={() => setCurrentIndex(prev => prev + 1)}
              sx={{ color: "white" }}
              disabled={currentIndex >= questions.length - 1}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>

          {/* Soru alanı */}
          <TextField
            label="Question"
            variant="outlined"
            fullWidth
            multiline
            value={current.text}
            onChange={(e) => updateCurrentQuestion({ text: e.target.value })}
            rows={4}
            sx={{
              '& .MuiInputBase-input': { color: 'white' },
              '& .MuiInputLabel-root': { color: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' },
              },
            }}
          />

          {/* Doğru/Yanlış seçimi */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 6, mt: 2 }}>
            <IconButton onClick={() => updateCurrentQuestion({ answer: true })}>
              <CheckCircleIcon sx={{ fontSize: 50, color: current.answer === true ? 'white' : 'gray' }} />
            </IconButton>
            <IconButton onClick={() => updateCurrentQuestion({ answer: false })}>
              <CancelIcon sx={{ fontSize: 50, color: current.answer === false ? 'white' : 'gray' }} />
            </IconButton>
          </Box>
        </Box>

        <Button
          disabled={isDisabled}
          onClick={handleSubmit}
          sx={{
            mt: 2,
            color: "rgb(134, 128, 128)",
            '&:hover': { color: 'white' }
          }}
        >
          Submit
        </Button>
      </Box>

      {/* + Butonu */}
      <IconButton
        disabled={isDisabled}
        onClick={handleAddNewQuestion}
        sx={{
          position: 'absolute',
          bottom: 20,
          right: 70,
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

      {/* - Butonu */}
      <IconButton
        disabled={questions.length === 1}
        onClick={handleDeleteQuestion}
        sx={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          backgroundColor: '#ff4d4d',
          color: 'white',
          '&:hover': {
            backgroundColor: '#d32f2f',
          },
        }}
      >
        <RemoveCircleIcon />
      </IconButton>
    </Box>
  );
}
