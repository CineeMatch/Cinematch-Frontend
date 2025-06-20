import { useEffect, useState } from 'react'
import { Box, Typography, TextField, Avatar, Grid, Card, CardContent,
  InputAdornment, FormControl, InputLabel, Select, MenuItem,
  Button, 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getAllUsers } from '../api/profile/user';
import { useNavigate } from 'react-router-dom';

const Users = () => {

  const [type, setType] = useState(0);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  const fetchFriends = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  // 🔍 Search filtreleme işlemi
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );


  return (
    <Box
      sx={{
        marginTop: '64px',
        minHeight: '100vh',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.79), rgba(0, 0, 0, 0.5)),
    url(/images/main-Photoroom.png)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
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
            Kullanıcılar <strong>{users.length}</strong>
          </Typography>
          <Button
            variant="contained"
            sx={{ bgcolor: '#e11f0d', color: 'white', fontWeight: "bold" }}
            onClick={() => navigate('/friends')}
          >
            Arkdaşlarını Görüntüle
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
          <Typography variant="h6" gutterBottom>Kullanıcılar</Typography>
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
            <InputLabel id="demo-select-small-label">Tür</InputLabel>
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
              <MenuItem value={0}>Karşık</MenuItem>
              <MenuItem value={1}>Sıralı</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={2}>
          {filteredUsers.map((user, index) => (
            <Grid item xs={type ? 12 : 6} md={type ? 12 : 4} key={index}>
              <Card sx={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'white', px: type ? 1 : 0 } } onClick={() => navigate(`/profile/${user.id}`)}>
                <CardContent sx={{ p: type ? 1 : 2, mt: 1 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center">
                      <Avatar src={user.profile_image_url} alt={user.name} sx={{ width: 48, height: 48, mr: 2 }} />
                      <Box textAlign="left">
                        <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>{user.name}</Typography>
                        <Typography variant="body2" sx={{ color: 'gray' }}>
                          Last Online {user.lastOnline}
                        </Typography>
                      </Box>
                    </Box>

                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

      </Box>
    </Box>
  )
}

export default Users
