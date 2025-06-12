import { useEffect, useState } from 'react'
import {
  Box, Typography, Button, TextField, Avatar, Grid, Card, CardContent, Stack,
  InputAdornment, FormControl, InputLabel, Select, MenuItem, IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { deleteFriendById, getCurrentUserFriendsList } from '../api/profile/friends';
import AddFriendModal from '../modals/profile/AddFriendModal';

const Friends = () => {

  const [type, setType] = useState(0);
  const [friends, setFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [IsShowAddFriendModal, setIsShowAddFriendModal] = useState(false);

  const fetchFriends = async () => {
    try {
      const response = await getCurrentUserFriendsList();
      setFriends(response);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleDeleteFriend = (id) => {
    const deleteFriend = async (id) => {
      try {
        await deleteFriendById(id);
        console.log(`Friend with ID ${id} deleted`);
        fetchFriends(); // Silinince güncelle
      } catch (error) {
        console.error('Error deleting friend:', error);
      }
    };
    deleteFriend(id);
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  // 🔍 Search filtreleme işlemi
  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url('/images/movie-background.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        backgroundBlendMode: 'overlay',
        p: 4,
      }}
    >
      <Box
        sx={{
          bgcolor: 'rgba(50,0,0,0.8)',
          borderRadius: 2,
          p: 4,
          maxWidth: 1000,
          mx: 'auto',
          color: 'white',
        }}
      >

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">
            YOUR FRIENDS <strong>{friends.length}</strong> / 500
          </Typography>
          <Button
            variant="contained"
            sx={{ bgcolor: '#e11f0d', color: 'white', fontWeight: "bold" }}
            startIcon={<PersonAddIcon />}
            onClick={() => setIsShowAddFriendModal(true)}
          >
            Add a Friend
          </Button>
        </Box>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search friends by name or game"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: 'white' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'rgba(255, 0, 0, 0.5)' },
              '&:hover fieldset': { borderColor: 'red' },
              '&.Mui-focused fieldset': { borderColor: '#f44336' },
            },
            '& .MuiInputLabel-root.Mui-focused': { color: '#f44336' },
            input: { color: 'white' }, fieldset: { borderColor: 'gray' }
          }}
        />

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" gutterBottom>Friends</Typography>
          <FormControl
            sx={{
              m: 1,
              minWidth: 120,
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' },
              },
              '& .MuiInputLabel-root': { color: 'white' },
              '& .MuiInputLabel-root.Mui-focused': { color: 'white' },
              '& .MuiSelect-icon': { color: 'white' },
            }}
            size="small"
          >
            <InputLabel id="demo-select-small-label">Type</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={type}
              label="Mixed"
              onChange={handleTypeChange}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: 'transparent',
                    backdropFilter: 'blur(5px)',
                    color: 'white',
                    boxShadow: 'none',
                  },
                },
              }}
            >
              <MenuItem value={0}>Mixed</MenuItem>
              <MenuItem value={1}>Serial</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={2}>
          {filteredFriends.map((friend, index) => (
            <Grid item xs={type ? 12 : 6} md={type ? 12 : 4} key={index}>
              <Card sx={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'white', px: type ? 1 : 0 }}>
                <CardContent sx={{ p: type ? 1 : 2, mt: 1 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center">
                      <Avatar src={friend.avatar} alt={friend.name} sx={{ width: 48, height: 48, mr: 2 }} />
                      <Box textAlign="left">
                        <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>{friend.name}</Typography>
                        <Typography variant="body2" sx={{ color: 'gray' }}>
                          Last Online {friend.lastOnline}
                        </Typography>
                      </Box>
                    </Box>
                    <IconButton
                      onClick={() => handleDeleteFriend(friend.id)}
                      sx={{ color: '#f44336', '&:hover': { color: '#d32f2f' } }}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

      </Box>
      {IsShowAddFriendModal && (
        <AddFriendModal setIsShowAddFriendModal={setIsShowAddFriendModal} />
      )}
    </Box>
  );
};

export default Friends;
