import React, { useState } from 'react';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import Post from '../components/Profile/Post.jsx';
import Stat from '../components/Profile/Stat.jsx';
import EditProfileModal from '../modals/profile/EditProfileModal.jsx';

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
  const [favoriteMovies, setFavoriteMovies] = useState(21)
  const [posts, setPosts] = useState([
    { id: 1, content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', tags: ['Spiderman'], category: 'Fantasy' },
    { id: 2, content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', tags: ['Batman'], category: 'Action' },
    { id: 3, content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', tags: ['Superman'], category: 'Adventure' },
  ]);
  const [IsShowEditProfileModal, setIsShowEditProfileModal] = useState(false);

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
                <Box key={index} sx={{ width: 50, height: 50, backgroundColor: '#999', borderRadius: 1 }}/>
              ))}
            </Box>
          </Box>
          {/* Posts Section */}
          <Box sx={{ mt:2 }}>
            {posts.map((post, index) => (
              <Post index={index} nickname={nickname} category={post.category} content={post.content} tags={post.tags}/>
            ))}
          </Box>
        </Grid>

        {/* Stats Section */}
        <Stat
          level={level}
          lastActivity={lastActivity}
          badge={badge}
          friends={friends}
          watched={watched}
          wishlist={wishlist}
          activeChallenges={activeChallenges}
          favoriteMovies={favoriteMovies}
          setIsShowEditProfileModal={setIsShowEditProfileModal}
        />
      </Grid>

      { IsShowEditProfileModal && (
        <EditProfileModal setIsShowEditProfileModal={setIsShowEditProfileModal} avatar={avatar} nickname={nickname} name={name} description={description}/>
      )}
    </Box>
  );
};

export default ProfilePage;