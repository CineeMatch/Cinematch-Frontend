import { Box, Button,  Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';


const Stat = ({ level, lastActivity, badge, friends, favorites, watched, wishlist, activeChallenges, setIsShowEditProfileModal, isOwnProfile }) => {

  const navigate = useNavigate();

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
    navigate('/activeChallange');
  }

  return (
    <Grid item xs={12} md={4}>
      <Box sx={{ p: 3, backgroundColor: 'rgba(128,0,0,0.7)', borderRadius: 2, height: '100%', textAlign: 'center' }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 5 }}>
            LEVEL <Box sx={{ backgroundColor: 'white', color: 'black', borderRadius: '50%', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', ml: 1 }}>{level}</Box>
          </Typography>
          <Typography variant="subtitle2" sx={{ mt: 1 }}>LAST ACTIVITY: {lastActivity}</Typography>
          <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, width: '100%' }}>
          {isOwnProfile ? (
            <Button
              variant="contained"
              sx={{ backgroundColor: '#800000', width: "100%" }}
              onClick={handleEditProfile}
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ bgcolor: '#e11f0d', color: 'white', fontWeight: "bold", width: "100%" }}
              startIcon={<PersonAddIcon />}
              onClick={() => console.log("Add Friend Clicked")}
            >
              Add a Friend
            </Button>
          )}
          </Box>
        <Typography variant="h6" sx={{ mt: 3 }}>Badges {badge}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 1 }}>
          {[...Array(5)].map((_, index) => (
            <Box key={index} sx={{ width: 40, height: 40, backgroundColor: '#999', borderRadius: 1 }} />
          ))}
        </Box>
        <Box sx={{ mt: 3, textAlign: 'left', pl: 2 }}>
          <Typography onClick={navigateToFriends} variant="body1" sx={{ cursor: 'pointer' }}>Friends<span style={{ float: 'right', marginRight: '10px' }}>{friends}</span></Typography>
          <Typography onClick={navigateToFavorites} variant="body1" sx={{ cursor: 'pointer' }}>Favorites<span style={{ float: 'right', marginRight: '10px' }}>{favorites}</span></Typography>
          <Typography onClick={navigateToWatched} variant="body1" sx={{ cursor: 'pointer' }}>Watched<span style={{ float: 'right', marginRight: '10px' }}>{watched}</span></Typography>
          <Typography onClick={navigateToWishlist} variant="body1" sx={{ cursor: 'pointer' }}>Wishlist<span style={{ float: 'right', marginRight: '10px' }}>{wishlist}</span></Typography>
          <Typography onClick={navigateToActiveChallenges} variant="body1" sx={{ cursor: 'pointer' }}>Active Challenges<span style={{ float: 'right', marginRight: '10px' }}>{activeChallenges}</span></Typography>
        </Box>
      </Box>
    </Grid>
  )
}

export default Stat
