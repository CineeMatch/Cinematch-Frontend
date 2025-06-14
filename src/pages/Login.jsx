import { useState, useEffect } from 'react';
import { Box, TextField, Button, Checkbox, FormControlLabel, Typography, Link, Paper, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth/auth';

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  // ✅ Email formatını kontrol eden fonksiyon
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // ✅ E-mail'i hatırla kutucuğunun kontrolü
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true); // kutucuğu işaretli göster
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setEmailError(true); // ❌ Geçersizse hata göster
      return;
    }

    setEmailError(false);  // ✅ Geçerli e-mail

    if (rememberMe) {
    localStorage.setItem('rememberedEmail', email); // ✅ e-mail'i kaydet
  } else {
    localStorage.removeItem('rememberedEmail'); // ❌ kutu işaretli değilse sil
  }

    const userData = {
      email,
      password,
    };

    const fetchData = async (data) => {
      try {
        const response = await login(data);
        navigate('/home');
      } catch (error) {
        console.error("Login error:", error); // console.error yerine bir natification kütüphanesi kullanılanılıcak
      }
    }
    
    fetchData(userData);
    
    console.log("Login data:", { email, password }); // ✅ Giriş verilerini kontrol et

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
        height: 500,
          width: 360,
          p: 4,
          bgcolor: 'rgba(0, 0, 0, 0.9)',
          color: 'white',
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Sign In
        </Typography>

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
          type={showPassword ? 'text' : 'password'}
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

        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          type="submit"
          sx={{ mt: 4, mb: 1, bgcolor: '#C43D37', '&:hover': { bgcolor: '#a8322d' }, borderRadius: 3, height: 50, fontSize: '1.1rem', fontWeight: 'bold' }}
        >
          Sign In
        </Button>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <FormControlLabel
            control={<Checkbox sx={{ color: 'white' }} />}
            label={<Typography color="white" sx={{ fontSize: "1rem", fontWeight: "bold"}}>Remember Me</Typography>}
          />
          <Link href="/forgetPassword" underline="hover" color="white" fontSize="1rem" fontWeight="bold">
            You Forget your password?
          </Link>
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="grey" gutterBottom sx={{ mt: 5, fontSize: '1.1rem' }}>
            New to CineMatch?{' '}
            <Link href="/register" underline="hover" color="white" fontWeight="bold">
              Sign up now
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
