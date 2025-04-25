import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link, Paper, InputAdornment, IconButton } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { Register } from '../../api/auth/auth';

const RegisterPage = () => {

  const [firstname, setFirstname] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCorrect, setPasswordCorrect] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCorrect, setShowPasswordCorrect] = useState(false);
  const [emailError, setEmailError] = useState(false);

  // const navigate = useNavigate();

  // ✅ Email formatını kontrol eden fonksiyon
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setEmailError(true); // ❌ Geçersizse hata göster
      return;
    }

    setEmailError(false);  // ✅ Geçerli e-mail

    if (password !== passwordCorrect) {
      alert("Passwords do not match!"); // alert yerine bir natification kütüphanesi kullanılanılıcak
      return;
    }

    // const userData = {
    //   firstname,
    //   nickname,
    //   email,
    //   password,
    //   passwordCorrect
    // };

    // const fetchData = async () => {
    //   try {
    //     const response = await Register(userData);
    //     navigate('/home');
    //   } catch (error) {
    //     console.error("Registration error:", error); // console.error yerine bir natification kütüphanesi kullanılanılıcak
    //   }
    // };

    // fetchData();
  }

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
          Sign Up
        </Typography>

        <TextField
          label="Firstname"
          variant="filled"
          fullWidth
          margin="normal"
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
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />

        <TextField
          label="Nickname"
          variant="filled"
          fullWidth
          margin="normal"
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
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        <TextField
          label="Email or phone number"
          variant="filled"
          fullWidth
          margin="normal"
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError} // 🔴 hata kontrolü
          helperText={emailError ? 'Please enter a valid email address.' : ''}
        />

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
          Sign Up
        </Button>

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="grey" sx={{ mt: 4, fontSize: '1.1rem' }}>
            Have account?{' '}
            <Link href="/login" underline="hover" color="white" fontWeight="bold">
              Sign in now
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegisterPage;
