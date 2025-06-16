/* eslint-disable react-hooks/exhaustive-deps */
// src/pages/ProfilePage.jsx
import { useEffect, useState } from 'react';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import Stat from '../components/Profile/Stat.jsx';
import EditProfileModal from '../modals/profile/EditProfileModal.jsx';
import { getActiveUser, getUserById } from '../api/profile/user.js';
import { getPostsByUserId } from '../api/profile/post.js';
import { getUserMovieTypesCounts } from '../api/profile/movieType.js';
import PostCard from '../components/community/PostCard.jsx';

const ProfilePage = () => {
  const { userId } = useParams(); // URL'deki userId
  const [activeUserId, setActiveUserId] = useState("");
  const [profileData, setProfileData] = useState({});
  const [avatar, setAvatar] = useState('/images/default-avatar.png'); 
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [IsShowEditProfileModal, setIsShowEditProfileModal] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [watchedCount, setWatchedCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const fetchUserMovieTypesCounts = async (userId) => {
    try {
      const movieTypesCounts = await getUserMovieTypesCounts(userId);
      console.log("Movie Types Counts:", movieTypesCounts);
      setFavoritesCount(movieTypesCounts.favoriteCount);
      setWatchedCount(movieTypesCounts.watchedCount);
      setWishlistCount(movieTypesCounts.wishlistCount);
    } catch (error) {
      console.error('Movie types counts alınamadı:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const activeUser = await getActiveUser();
      setActiveUserId(activeUser.id);

      const isMe = !userId || userId === String(activeUser.id);
      setIsOwnProfile(isMe);

      const profileToLoad = isMe ? activeUser : await getUserById(userId);
      setProfileData(profileToLoad);
    } catch (error) {
      console.error('Profil verisi alınamadı:', error);
    }
  };

  const fetchPosts = async (id) => {
    try {
      const posts = await getPostsByUserId(id);
      setProfileData((prevData) => ({
        ...prevData,
        posts: posts || [],
      }));
    } catch (error) {
      console.error('Posts alınamadı:', error);
    }
  };
  
  const handleAvatarUpdate = (newAvatarUrl) => {
    setProfileData((prev) => ({
      ...prev,
      profile_image_url: newAvatarUrl, 
    }));
    setAvatar(newAvatarUrl); 
  };
  
  
  useEffect(() => {
    fetchUserData();
  }, [userId]);

  useEffect(() => {
    if (activeUserId) {
      fetchPosts(userId || activeUserId);
    }
  }, [activeUserId]);

  useEffect(() => {
    if (profileData.profile_image_url) {
      setAvatar(profileData.profile_image_url);
    }
  }, [profileData.profile_image_url]);

  useEffect(() => {
    if (activeUserId || userId) {
      fetchUserMovieTypesCounts(userId || activeUserId);
    }
  }, [activeUserId, userId]);


  if (!profileData) return <div>Loading...</div>;

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
            <Avatar src={avatar} sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }} />
            <Typography variant="h5">{profileData.nickname}</Typography>
            <Typography variant="subtitle1">{profileData.name}</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>{profileData.description}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
              {[...Array(5)].map((_, index) => (
                <Box key={index} sx={{ width: 50, height: 50, backgroundColor: '#999', borderRadius: 1 }}/>
              ))}
            </Box>
          </Box>
          {/* Posts Section */}
          { profileData.posts && profileData.posts.length > 0 && (
          <Box sx={{ mt: 2 }}>
            {profileData.posts.map((post) => (
              <Box key={post.id} sx={{ mb: 2 }}>
              <PostCard
                key={post.id}
                id={post.id}
                nickname={profileData.nickname}
                text={post.contentText}
                selectedMovie={post.Movie.title}
                />
              </Box>
            ))}
          </Box>
          )}
        </Grid>

        {/* Stats Section */}
        {watchedCount === undefined || wishlistCount === undefined || favoritesCount === undefined
        ? <Typography>Loading stats...</Typography>
        : <Stat
            level={profileData.level}
            lastActivity={profileData.lastActivity}
            badge={profileData.badge}
            friends={profileData.friends}
            watched={watchedCount}
            wishlist={wishlistCount}
            activeChallenges={profileData.activeChallenges}
            favorites={favoritesCount}
            setIsShowEditProfileModal={setIsShowEditProfileModal}
            isOwnProfile={isOwnProfile}
          />
      }
      </Grid>

      {IsShowEditProfileModal && (
        <EditProfileModal
          setIsShowEditProfileModal={setIsShowEditProfileModal}
          avatar={profileData.avatar}
          nickname={profileData.nickname}
          name={profileData.name}
          description={profileData.description}
          onAvatarUpdate={handleAvatarUpdate}
        />
      )}
    </Box>
  );
};

export default ProfilePage;
