import React from 'react';
import { Box, TextField, Button, Checkbox, FormControlLabel, Typography, Link, Paper } from '@mui/material';

const LoginPage = () => {
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
          width: 350,
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
            />

            <TextField
            label="Password"
            type="password"
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
            />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 4, mb: 1, bgcolor: '#C43D37', '&:hover': { bgcolor: '#a8322d' }, borderRadius: 3, height: 50, fontSize: '1.1rem', fontWeight: 'bold' }}
        >
          Sign In
        </Button>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <FormControlLabel
            control={<Checkbox sx={{ color: 'white' }} />}
            label={<Typography color="white" sx={{ fontSize: "1rem", fontWeight: "bold"}}>Remember Me</Typography>}
          />
          <Link href="#" underline="hover" color="white" fontSize="1rem" fontWeight="bold">
            I Forget your password?
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
