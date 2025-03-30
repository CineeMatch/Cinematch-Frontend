import React from 'react';
import { Avatar, Box, Button, Card, CardContent, Chip, Grid, Typography } from '@mui/material';

const ProfilePage = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#000',
        minHeight: '100vh',
        color: 'white',
        p: 3,
        backgroundImage: "url('/images/movie-background.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 1,
      }}
    >
      <Grid container spacing={2}>
        {/* Profile Info */}
        <Grid item xs={12} md={8}>
          <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2 }}>
            <Avatar sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }} />
            <Typography variant="h5">Dreath</Typography>
            <Typography variant="subtitle1">Abdullah Can</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>Description</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
              {[...Array(5)].map((_, index) => (
                <Box key={index} sx={{ width: 50, height: 50, backgroundColor: '#999', borderRadius: 1 }} />
              ))}
            </Box>
          </Box>
          {/* Posts Section */}
          <Box sx={{ mt: 2 }}>
            {[...Array(3)].map((_, index) => (
              <Card key={index} sx={{ backgroundColor: 'rgba(128,0,0,0.7)', color: 'white', mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar />
                    <Typography variant="h6">Dreath</Typography>
                    <Chip label="Fantasy" sx={{ ml: 'auto', backgroundColor: '#800000', color: 'white' }} />
                  </Box>
                  <Typography variant="body2" sx={{ mt: 1 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Typography>
                  <Chip label="Spiderman" sx={{ mt: 1, backgroundColor: '#666', color: 'white' }} />
                </CardContent>
              </Card>
            ))}
          </Box>
        </Grid>

        {/* Stats Section */}
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 3, backgroundColor: 'rgba(128,0,0,0.7)', borderRadius: 2, height: '100%', textAlign: 'center' }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              LEVEL <Box sx={{ backgroundColor: 'white', color: 'black', borderRadius: '50%', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', ml: 1 }}>13</Box>
            </Typography>
            <Typography variant="subtitle2" sx={{ mt: 1 }}>LAST ACTIVITY: 14.03.2025</Typography>
            <Button variant="contained" sx={{ mt: 2, backgroundColor: '#800000', width: '100%' }}>Edit Profile</Button>
            <Typography variant="h6" sx={{ mt: 3 }}>Badges 17</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 1 }}>
              {[...Array(4)].map((_, index) => (
                <Box key={index} sx={{ width: 40, height: 40, backgroundColor: '#999', borderRadius: 1 }} />
              ))}
            </Box>
            <Box sx={{ mt: 3, textAlign: 'left', pl: 2 }}>
              <Typography variant="body1">Friends <span style={{ float: 'right', marginRight: '10px' }}>21</span></Typography>
              <Typography variant="body1">Watched <span style={{ float: 'right', marginRight: '10px' }}>18</span></Typography>
              <Typography variant="body1">Wishlist <span style={{ float: 'right', marginRight: '10px' }}>35</span></Typography>
              <Typography variant="body1">Active Challenges <span style={{ float: 'right', marginRight: '10px' }}>7</span></Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
