import React, { useState } from 'react'
import { Box, Typography, Button, TextField, Avatar, Grid, Card, CardContent, Stack, InputAdornment, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Friends = () => {

    const [type, setType] = useState(0); // dark, light, custom
    console.log("1.",type)

    const friends = {
        // online: [
        //     { name: 'erql', avatar: '/avatars/erql.png' },
        //     { name: 'JESSE', avatar: '/avatars/jesse.png' },
        // ],
        offline: [
            { name: 'abyss', lastOnline: '26 days ago', avatar: '/avatars/abyss.png' },
            { name: 'Ezio Auditore da Firenze', lastOnline: '13 hrs, 21 mins ago', avatar: '/avatars/ezio.png' },
            { name: 'kubrasaglam309', lastOnline: '72 days ago', avatar: '/avatars/kubra.png' },
            { name: 'mahmutgxu', lastOnline: '194 days ago', avatar: '/avatars/mahmut.png' },
            { name: 'Revenge', lastOnline: '7 days ago', avatar: '/avatars/revenge.png' },
            { name: 'skadoosh', lastOnline: '7 days ago', avatar: '/avatars/skadoosh.png' },
            { name: 'Alfie Solomons', lastOnline: '413 days ago', avatar: '/avatars/alfie.png' },
            { name: 'Senacimmmmm*', lastOnline: '6 days ago', avatar: '/avatars/senacim.png' },
            { name: 'Laurence Barnes', lastOnline: '8 hrs, 58 mins ago', avatar: '/avatars/laurence.png' },
            { name: 'MorG', lastOnline: '4 days ago', avatar: '/avatars/morg.png' },
            { name: 'Selmn_erol', lastOnline: 'unknown', avatar: '/avatars/question.png' },
            { name: 'ÇılgınEczacı', lastOnline: 'unknown', avatar: '/avatars/crazypharma.png' },
            { name: 'Delicious joker', lastOnline: '6 days ago', avatar: '/avatars/joker.png' },
            { name: 'henelly~', lastOnline: '40 days ago', avatar: '/avatars/henelly.png' },
            { name: 'Ebrar Taşdemir*', lastOnline: '3 hrs, 24 mins ago', avatar: '/avatars/ebrar.png' },
            { name: 'omerkrd', lastOnline: '41 hrs, 22 mins ago', avatar: '/avatars/omer.png' },
            { name: 'Shendar', lastOnline: '10 hrs, 45 mins ago', avatar: '/avatars/shendar.png' },
            { name: 'eren', lastOnline: '38 days ago', avatar: '/avatars/eren.png' },
        ],
    };

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
            YOUR FRIENDS <strong>{friends.offline.length}</strong> / 500
          </Typography>
          <Button
            variant="contained"
            sx={{ bgcolor: '#e11f0d', color: 'white', fontWeight: "bold" }}
            startIcon={<PersonAddIcon />}
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
          sx={{ mb: 3, input: { color: 'white' }, fieldset: { borderColor: 'gray' } }}
        />

        {/* <Typography variant="h6" gutterBottom>
          Online
        </Typography>
        <Grid container spacing={2} mb={4}>
          {friends.online.map((friend) => (
            <Grid item xs={6} md={4} key={friend.name}>
              <Card sx={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'white' }}>
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={friend.avatar} alt={friend.name} />
                    <Typography>{friend.name}</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid> */}

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
          {friends.offline.map((friend) => (
            <Grid item xs={6} md={4} key={friend.name}>
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
          {friends.offline.map((friend) => (
            <Grid item xs={12} key={friend.name}>
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
    </Box>
  )
}

export default Friends
