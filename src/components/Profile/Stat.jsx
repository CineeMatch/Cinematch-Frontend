import { Avatar, Box, Button,  Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { addFriendByUserId } from '../../api/profile/friends';
import { getBadgesByUserId } from '../../api/badge/user-badge';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Stat = ({ id, friend_id, level, badge, friends, favorites, watched, wishlist, activeChallenges, setIsShowEditProfileModal, isOwnProfile }) => {

  const [badges, setBadges] = useState([]);

  const navigate = useNavigate();

  const handleAddFriend = () => {
    
    const addFriend = async (id) => {
      try {
        const response = await addFriendByUserId(id);
        if (response) {
          console.log("Friend added successfully");
        } else {
          console.error("Failed to add friend");
        }
      } catch (error) {
        console.error("Error adding friend:", error);
        toast.error("Arkadaş eklenemedi. Lütfen tekrar deneyiniz.");
      }
    };
    addFriend(friend_id);
  }

  const fetchUserBadges = async (userId) => {
    try {
      const response = await getBadgesByUserId(userId);
      console.log("Badges fetched:", response.userBadges);
      setBadges(response.userBadges || []);
    } catch (error) {
      console.error("Error fetching badges:", error);
      toast.error("Badges alınamadı. Lütfen tekrar deneyiniz.");
    }
  };

  const handleEditProfile = () => {
    setIsShowEditProfileModal(true);
  }

  const navigateToFriends = () => {
    navigate('/friends');
  }

  const navigateToFavorites = () => {
    navigate('/favorites');
  }

  const navigateToWatched = () => {
    navigate('/watched');
  }

  const navigateToWishlist = () => {
    navigate('/wishlist');
  }

  const navigateToActiveChallenges = () => {
    navigate('/activeChallenge');
  }

  useEffect(() => {
    if (id) {
      fetchUserBadges(id);
    }
  }, [id]);

  return (
    <Grid item xs={12} md={4}>
      <Box sx={{ p: 3, backgroundColor: 'rgba(76, 2, 2, 0.7)', borderRadius: 2, height: '96%', textAlign: 'center' }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 5 }}>
            LEVEL <Box sx={{ backgroundColor: 'white', color: 'black', borderRadius: '50%', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', ml: 1 }}>{level}</Box>
          </Typography>
          <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, width: '100%' }}>
          {isOwnProfile ? (
            <Button
              variant="contained"
              sx={{ backgroundColor: '#800000', width: "100%", color: 'white', fontWeight: "bold" }}
              onClick={handleEditProfile}
            >
              Profil Güncelle
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ bgcolor: '#e11f0d', color: 'white', fontWeight: "bold", width: "100%" }}
              startIcon={<PersonAddIcon />}
              onClick={handleAddFriend}
            >
              Arkadaş Ekle
            </Button>
          )}
          </Box>
        <Typography variant="h6" sx={{ mt: 3 }}>Badges {badge}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 1 }}>
          {/* Eğer badges verisi varsa */}
          {badges.length > 0 ? (
            badges.slice(0, 5).map((badge, index) => (
              <Avatar
                key={badge.id || index}
                sx={{ width: 70, height: 70, backgroundColor: '#999', borderRadius: 1 }}
                variant="rounded"
                src={badge.badge ? badge.badge.image_url : '/images/badge-default.png'}
              />
            ))
          ) : (
            // Eğer badges verisi yoksa veya 0 ise 5 tane default badge gösterelim
            [...Array(5)].map((_, index) => (
              <Avatar
                key={index}
                sx={{ width: 70, height: 70, backgroundColor: '#999', borderRadius: 1 }}
                variant="rounded"
                src="/images/badge-default.png"
              />
            ))
          )}
        </Box>
        <Box sx={{ mt: 3, textAlign: 'left', pl: 2 }}>
          <Typography onClick={navigateToFriends} variant="body1" fontWeight="bold" sx={{ cursor: 'pointer', mb:1 }}>Arkadaşlarım<span style={{ float: 'right', marginRight: '10px' }}>{friends}</span></Typography>
          <Typography onClick={navigateToFavorites} variant="body1" fontWeight="bold" sx={{ cursor: 'pointer', mb:1 }}>Favorilerim<span style={{ float: 'right', marginRight: '10px' }}>{favorites}</span></Typography>
          <Typography onClick={navigateToWatched} variant="body1" fontWeight="bold" sx={{ cursor: 'pointer', mb:1  }}>İzlediklerim<span style={{ float: 'right', marginRight: '10px' }}>{watched}</span></Typography>
          <Typography onClick={navigateToWishlist} variant="body1" fontWeight="bold" sx={{ cursor: 'pointer', mb:1  }}>İstek Listem<span style={{ float: 'right', marginRight: '10px' }}>{wishlist}</span></Typography>
          <Typography onClick={navigateToActiveChallenges} variant="body1" fontWeight="bold" sx={{ cursor: 'pointer', mb:1  }}>Meydan Okuma<span style={{ float: 'right', marginRight: '10px' }}>{activeChallenges}</span></Typography>
        </Box>
      </Box>
    </Grid>
  )
}

export default Stat