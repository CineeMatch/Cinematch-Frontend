import React, { useEffect, useState } from 'react'
import { Box, Typography, Button, TextField, Avatar, Grid, Card, CardContent, Stack, InputAdornment, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { getCurrentUserFriendsList } from '../api/profile/friends';
import AddFriendModal from '../modals/profile/AddFriendModal';

const Friends = () => {

  const [type, setType] = useState(0);
  const [friends, setFriends] = useState([]);
  const [IsShowAddFriendModal, setIsShowAddFriendModal] = useState(false); 

  useEffect(() => {

    const fetchFriends = async () => {
      try {
        const response = await getCurrentUserFriendsList();
        setFriends(response);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };
    fetchFriends();
  }
  , []);

  const handleTypeChange = (event) => {
      setType(event.target.value);
  }

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
            '& fieldset': {
                borderColor: 'rgba(255, 0, 0, 0.5)', // normal border rengi
            },
            '&:hover fieldset': {
                borderColor: 'red', // hover durumunda border
            },
            '&.Mui-focused fieldset': {
                borderColor: '#f44336', // focus (yazarken) border rengi
            },
            },
            '& .MuiInputLabel-root.Mui-focused': {
            color: '#f44336' // label rengi focus olduğunda
            },
            input: { color: 'white' }, fieldset: { borderColor: 'gray' } 
            
        }}
        />

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" gutterBottom>
            {/* Offline */}
                Friends
            </Typography>
            <FormControl
                sx={{
                    m: 1,
                    minWidth: 120,
                    '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': {
                        borderColor: 'white',
                    },
                    '&:hover fieldset': {
                        borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'white',
                    },
                    },
                    '& .MuiInputLabel-root': {
                    color: 'white',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                    color: 'white',
                    },
                    '& .MuiSelect-icon': {
                    color: 'white',
                    },
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
                        backgroundColor: 'transparent', // transparan arka plan
                        backdropFilter: 'blur(5px)', // opsiyonel: hafif blur efekti
                        color: 'white', // yazı rengi beyaz
                        boxShadow: 'none', // gölgeyi kaldır
                        },
                    },
                    }}
                >
                    <MenuItem value={0}>Mixed</MenuItem>
                    <MenuItem value={1}>Serial</MenuItem>
                </Select>
            </FormControl>
        </Box>
        
        {!type ? (
        <Grid container spacing={2}>
          {friends.map((friend,index) => (
            <Grid item xs={6} md={4} key={index}>
              <Card sx={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'white' }}>
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={friend.avatar} alt={friend.name} />
                     <Box textAlign="left">
                      <Typography sx={{ fontSize: '1rem', textAlign: 'left', fontWeight: "bold" }}>{friend.name}</Typography>
                      <Typography variant="body2" sx={{ color: 'gray', textAlign: 'left' }}>
                        Last Online {friend.lastOnline}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        ):(
        <Grid container spacing={2}>
          {friends.map((friend, index) => (
            <Grid item xs={12} key={index}>
              <Card sx={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'white', px: 1 }}>
                <CardContent sx={{ p: 1 }}>
                  <Box display="flex" alignItems="center">
                    <Avatar src={friend.avatar} alt={friend.name} sx={{ width: 48, height: 48, mr: 2 }} />
                    <Box textAlign="left">
                      <Typography sx={{ fontSize: '1rem', textAlign: "left", fontWeight: "bold" }}>{friend.name}</Typography>
                      <Typography variant="body2" sx={{ color: 'gray', textAlign: 'left' }}>
                        Last Online {friend.lastOnline}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        )}
        
      </Box>
      { IsShowAddFriendModal && (
        <AddFriendModal setIsShowAddFriendModal={setIsShowAddFriendModal}/>
      )}
    </Box>
  )
}

export default Friends
