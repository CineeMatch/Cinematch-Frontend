/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Avatar, Box, Button, Card, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import Stat from '../components/Profile/Stat.jsx';
import EditProfileModal from '../modals/profile/EditProfileModal.jsx';
import { getActiveUser, getUserById } from '../api/profile/user.js';
import { getPostsByUserId } from '../api/post/post.js';
import { getUserMovieTypesCounts, getMovieTypeOnProfileByUserId } from '../api/movieType/movieType.js';
import PostCard from '../components/community/PostCard.jsx';
import { useNavigate } from 'react-router-dom';

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
  const [movieData, setMovieData] = useState([]);

  const navigate = useNavigate();

  const fetchMovieData = async (userId) => {
    try {
      const movies = await getMovieTypeOnProfileByUserId(userId);
      setMovieData(movies.data);
      console.log('Movie types:', movies.data);
    } catch (error) {
      console.error('Movie types alınamadı:', error);
    }
  }

  const fetchUserMovieTypesCounts = async (userId) => {
    try {
      const movieTypesCounts = await getUserMovieTypesCounts(userId);
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

  useEffect(() => {
    if (activeUserId || userId) {
      fetchMovieData(userId || activeUserId);
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
            <Typography variant="h5" fontWeight="bold">{profileData.nickname}</Typography>
            <Typography variant="subtitle1" fontWeight="bold">{profileData.name}</Typography>
            <Typography variant="body2" fontWeight="bold" sx={{ mt: 1, mb: 2 }}>{profileData.description}</Typography>
            <Card sx={{ width: 720, height: 100, p: 1, bgcolor: "rgba(255, 255, 255, 0.05)", borderRadius: 2, display: "flex", flexDirection: "column",}}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
              {movieData.map((movie) => (
                <Avatar key={movie.id} sx={{ width: 80, height: 80, backgroundColor: '#999', borderRadius: 1 }} variant='rounded' src={movie.Movie.poster_url} alt={movie.Movie.title}/>
              ))}
            </Box>
            </Card>
          </Box>
          {/* Posts Section */}
          { profileData.posts && profileData.posts.length > 0 ? (
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
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button sx={{ fontWeight: "bold" }} variant="contained" color="error" onClick={() => navigate('/posts')}>
                show more posts
              </Button>
            </Box>
          </Box>
            
          ) : (
            <Card
            sx={{
              width: "95%",
              height: "40%",
              p: 2,
              bgcolor: "rgba(255, 255, 255, 0.05)",
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center", // Dikey ve yatay ortalama
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: "white", textAlign: "center", fontWeight: "bold" }}
            >
              Bu kullanıcı henüz bir paylaşım yapmadı.
            </Typography>
          </Card>
    
          )}
        </Grid>

        {/* Stats Section */}
        {watchedCount === undefined || wishlistCount === undefined || favoritesCount === undefined
        ? <Typography>Loading stats...</Typography>
        : <Stat
            id={userId || activeUserId}
            friend_id={userId}
            level={profileData.level}
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
