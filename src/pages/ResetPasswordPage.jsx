import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, InputAdornment, IconButton } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { resetPassword } from '../api/auth/auth.js';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { toast } from 'react-toastify';

const ResetPasswordPage = () => {

  const [password, setPassword] = useState('');
  const [passwordCorrect, setPasswordCorrect] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCorrect, setShowPasswordCorrect] = useState(false);
  const [isPasswordSaved, setIsPasswordSaved] = useState(false);

  const navigate = useNavigate();
  const userId = useParams().id;
  const handleSubmit = (e) => {
    e.preventDefault();

   if (password !== passwordCorrect) {
    alert("Passwords do not match!"); // alert yerine bir notification kullanılacak
    return;
  }
  const userData = {
    userId,
    password: passwordCorrect 
  };

  const fetchData = async (data) => {
    try {
      console.log("Fetching data for user:", data);
      console.log("Resetting password for user:", data.userId);
      const response = await resetPassword(data.userId, data.password);
      console.log("Password reset successful:", response);
      navigate('/');
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error("Şifre sıfırlama başarısız. Lütfen tekrar deneyiniz."); // ❌ Şifre sıfırlama başarısızsa hata mesajı göster
    }
  };

  fetchData(userData);
  setIsPasswordSaved(true);
};

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundImage: "url('/images/movie-background.jpeg')", // arka plan görseli
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {!isPasswordSaved && (
      <Paper
        elevation={8}
        sx={{
          width: 350,
          p: 4,
          bgcolor: 'rgba(0, 0, 0, 0.9)',
          color: 'white',
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Şifre Sıfırlama
        </Typography>

        <TextField
          label="Password"
          type={showPassword ? 'text' : "password"}
          variant="filled"
          fullWidth
          margin="normal"
          InputProps={{
            disableUnderline: true,
            sx: {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
                  
          }}
          InputLabelProps={{
            style: { color: 'gray' },
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <TextField
          label="Password Correct"
          type={showPasswordCorrect ? 'text' : "password"}
          variant="filled"
          fullWidth
          margin="normal"
          InputProps={{
            disableUnderline: true,
            sx: {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPasswordCorrect(!showPasswordCorrect)}
                  edge="end"
                >
                  {showPasswordCorrect ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            style: { color: 'gray' },
          }}
          value={passwordCorrect}
          onChange={(e) => setPasswordCorrect(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          type="submit"
          sx={{ mt: 4, mb: 1, bgcolor: '#C43D37', '&:hover': { bgcolor: '#a8322d' }, borderRadius: 3, height: 50, fontSize: '1.1rem', fontWeight: 'bold' }}
        >
          Yeni Şifreni Kaydet
        </Button>
      </Paper>
      )}

      {isPasswordSaved && (
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
            Şifre Başarıyla Değiştirildi!
          </Typography>
          <CheckCircleRoundedIcon sx={{ fontSize: 40, color: '#357a38' }} />
        </Paper>
      )}
    </Box>
  );
};

export default ResetPasswordPage;
