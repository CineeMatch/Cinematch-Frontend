import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { forgetPassword } from '../api/auth/auth.js';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { toast } from 'react-toastify';

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [isEmailSentCorrectly, setIsEmailSentCorrectly] = useState(false);

  // ✅ Email formatını kontrol eden fonksiyon
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!isValidEmail(email)) {
    setEmailError(true);
    return;
  }

  setEmailError(false);

  try {
    await forgetPassword(email); 
    setIsEmailSentCorrectly(true);
  } catch (error) {
    console.error("Şifre sıfırlama hatası:", error.message);
    toast.error("Şifre sıfırlama işlemi başarısız. Lütfen tekrar deneyiniz.");
  }
};

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundImage: 'url(/images/movie-background.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {!isEmailSentCorrectly && (
        <Paper
          elevation={8}
          sx={{
            width: 400,
            p: 4,
            bgcolor: 'rgba(0, 0, 0, 0.9)',
            color: 'white',
            borderRadius: 3,
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Enter your email
          </Typography>

          <TextField
            label="Email"
            variant="filled"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError} // 🔴 hata kontrolü
            helperText={emailError ? 'Please enter a valid email address.' : ''}
            InputProps={{
              disableUnderline: true,
              sx: {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
              },
            }}
            InputLabelProps={{
              style: { color: 'gray' },
            }}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit} 
            sx={{
              mt: 2,
              mb: 1,
              bgcolor: '#C43D37',
              '&:hover': { bgcolor: '#a8322d' },
              fontWeight: 'bold',
            }}
          >
            Send Reset Link
          </Button>
        </Paper>
      )}

      {isEmailSentCorrectly && (
        <Paper
          elevation={8}
          sx={{
            width: 400,
            p: 4,
            bgcolor: 'rgba(0, 0, 0, 0.9)',
            color: 'white',
            borderRadius: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Email Sent Successfully
          </Typography>
          <CheckCircleRoundedIcon sx={{ fontSize: 40, color: '#357a38' }} />
        </Paper>
      )}
    </Box>
  );
};

export default ForgetPasswordPage;
