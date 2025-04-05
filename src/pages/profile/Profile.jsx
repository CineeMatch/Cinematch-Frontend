import React, { useState } from 'react';
import { Avatar, Box, Button, Card, CardContent, Chip, Grid, Typography } from '@mui/material';

const ProfilePage = () => {

  const [avatar, setAvatar] = useState('/images/avatar.png');
  const [nickname, setNickname] = useState('Dreath');
  const [name, setName] = useState('Abdullah Can');
  const [description, setDescription] = useState('Lorem Ipsum is simply dummy text of the printing and typesetting industry.');
  const [level, setLevel] = useState(13);
  const [lastActivity, setLastActivity] = useState('14.03.2025');
  const [badge, setBadge] = useState(17);
  const [friends, setFriends] = useState(21);
  const [watched, setWatched] = useState(18);
  const [wishlist, setWishlist] = useState(35);
  const [activeChallenges, setActiveChallenges] = useState(7);
  const [posts, setPosts] = useState([
    { id: 1, content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', tags: ['Spiderman'], category: 'Fantasy' },
    { id: 2, content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', tags: ['Batman'], category: 'Action' },
    { id: 3, content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', tags: ['Superman'], category: 'Adventure' },
  ]);

  const handleEditProfile = () => {
    // Logic to edit profile
    console.log('Edit Profile Clicked');
  }

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
            <Typography variant="h5">{nickname}</Typography>
            <Typography variant="subtitle1">{name}</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>{description}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
              {[...Array(5)].map((_, index) => (
                <Box key={index} sx={{ width: 50, height: 50, backgroundColor: '#999', borderRadius: 1 }} />
              ))}
            </Box>
          </Box>
          {/* Posts Section */}
          <Box sx={{ mt: 2 }}>
            {posts.map((post, index) => (
              <Card key={index} sx={{ backgroundColor: 'rgba(128,0,0,0.7)', color: 'white', mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar />
                    <Typography variant="h6">{nickname}</Typography>
                    <Chip label={post.category} sx={{ ml: 'auto', backgroundColor: '#800000', color: 'white' }} />
                  </Box>
                  <Typography variant="body2" sx={{ mt: 1 }}>{post.content}</Typography>
                  <Chip label={post.tags} sx={{ mt: 1, backgroundColor: '#666', color: 'white' }} />
                </CardContent>
              </Card>
            ))}
          </Box>
        </Grid>

        {/* Stats Section */}
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 3, backgroundColor: 'rgba(128,0,0,0.7)', borderRadius: 2, height: '100%', textAlign: 'center' }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              LEVEL <Box sx={{ backgroundColor: 'white', color: 'black', borderRadius: '50%', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', ml: 1 }}>{level}</Box>
            </Typography>
            <Typography variant="subtitle2" sx={{ mt: 1 }}>LAST ACTIVITY: {lastActivity}</Typography>
            <Button variant="contained" sx={{ mt: 2, backgroundColor: '#800000', width: '100%' }}>Edit Profile</Button>
            <Typography variant="h6" sx={{ mt: 3 }}>Badges {badge}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 1 }}>
              {[...Array(4)].map((_, index) => (
                <Box key={index} sx={{ width: 40, height: 40, backgroundColor: '#999', borderRadius: 1 }} />
              ))}
            </Box>
            <Box sx={{ mt: 3, textAlign: 'left', pl: 2 }}>
              <Typography variant="body1">{friends} <span style={{ float: 'right', marginRight: '10px' }}>21</span></Typography>
              <Typography variant="body1">{watched} <span style={{ float: 'right', marginRight: '10px' }}>18</span></Typography>
              <Typography variant="body1">{wishlist} <span style={{ float: 'right', marginRight: '10px' }}>35</span></Typography>
              <Typography variant="body1">{activeChallenges}<span style={{ float: 'right', marginRight: '10px' }}>7</span></Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
