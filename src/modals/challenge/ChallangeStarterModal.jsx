import * as React from 'react';
import { useState } from 'react';
import {
  Box,
  Modal,
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  height: 400,
  background: 'linear-gradient(to bottom,rgb(55, 9, 9),rgb(0, 0, 0))',
  color: 'white',
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column',
  padding: 4,
};

export default function ChallengeStarterModal(props) {
  const [selectedTime, setSelectedTime] = useState('1 week');

  const challange = {
    image: '/images/shrek.png',
    name: 'Shrek'
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  return (
    <Modal open={props.open} onClose={props.onClose}
    >
      <Box sx={style}>
        {/* Başlık */}
        <Typography variant="h3" fontWeight="bold" mb={1.1} sx={{textAlign:"center"}}>
          CREATE CHALLENGE
        </Typography>

        {/* Alt: Poster + Bilgi Alanı */}
        <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1, gap: 3 }}>
          {/* Sol: Poster */}
          <Box
            component="img"
            src={challange.image}
            alt="poster"
            sx={{
              width: '220px',
              height: '350px',
              borderRadius: 1,
              boxShadow: '10px 10px 20px rgba(249, 234, 159, 0.3)',
            }}
          />

          {/* Sağ: Form alanı (column) */}
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, height:"350px",position: "relative", }}>
          <Typography
    variant="h1"
    sx={{
      position: 'absolute',
      top: '10%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '120px',
      fontWeight: 'bold',
      color: 'rgba(61, 61, 61, 0.58)',
      zIndex: 0,
      pointerEvents: 'none',
      userSelect: 'none',
    }}
  >
    {challange.name.toUpperCase()}
  </Typography>   
  <Box sx={{alignContent:"center", height:"400px"}}> 
            <Box sx={{ mb: 2,display:"flex", flexDirection:"row", alignContent:"center" }}>
              <Typography variant="body1" width="150px"  sx={{alignSelf:"center"}}>Movie Name:</Typography>
              <TextField
                fullWidth
                value={challange.name}
                InputProps={{ readOnly: true }}
                sx={{
                  input: { color: 'white' },
                  '& .MuiOutlinedInput-root': {
                    textAlign:"center",
                    backgroundColor: 'rgba(71, 6, 6, 0.53)',
                    borderRadius: 0.5,
                    '& fieldset': { borderColor: 'transparent' },
                  },
                }}
              />
            </Box>

            {/* Challenged */}
            
            <Box sx={{ mb: 2,display:"flex", flexDirection:"row", alignContent:"center" }}>
              <Typography variant="body1" width="150px"  sx={{alignSelf:"center"}}>Challenged:</Typography>
              <TextField
                fullWidth
                value={props.selectedFriend }
                InputProps={{ readOnly: true }}
                sx={{
                  input: { color: 'white' },
                  '& .MuiOutlinedInput-root': {
                    textAlign:"center",
                    backgroundColor: 'rgba(71, 6, 6, 0.53)',
                    borderRadius: 0.5,
                    '& fieldset': { borderColor: 'transparent' },
                  },
                }}
              />
            </Box>
           

            {/* Time */}
            <Box sx={{ mb: 2,display:"flex", flexDirection:"row", alignContent:"center" }}> 
            <Typography vvariant="body1" width="150px"  sx={{alignSelf:"center"}}>Time:</Typography>
              <FormControl fullWidth>
                <Select
                  value={selectedTime}
                  onChange={handleTimeChange}
                  sx={{
                    color: 'white',
                    backgroundColor: 'rgba(71, 6, 6, 0.53)',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'transparent',
                    },
                  }}
                >
                  <MenuItem value="1 day">1 day</MenuItem>
                  <MenuItem value="3 days">3 days</MenuItem>
                  <MenuItem value="1 week">1 week</MenuItem>
                  <MenuItem value="2 weeks">2 weeks</MenuItem>
                </Select>
              </FormControl>
            
              </Box>
            {/* Butonlar */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 'auto' }}>
              <Button
                variant="outlined"
                sx={{
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(204, 48, 48, 0.55)',
                  },
                }}
              >
                Submit
              </Button>
              <Button
                variant="outlined"
                sx={{
                  color: 'gray',
                  borderColor: 'gray',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.05)',
                  },
                }}
                onClick={props.onClose}
              >
                Cancel
              </Button>
              </Box>
              </Box>  
            
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}