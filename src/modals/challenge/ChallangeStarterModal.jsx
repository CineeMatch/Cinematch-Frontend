import { useState } from 'react';
import {
  Box,
  Modal,
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  // duration
} from '@mui/material';
import { createNewChallenge } from '../../api/challenge/challenge.js';
import toast from 'react-hot-toast';

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
// {/*const getDynamicFontSize = (text) => {
//   if (!text || typeof text !== 'string') return '20px'; // default font size
//   if (text.length <= 10) return '50px';
//   if (text.length <= 20) return '40px';
//   if (text.length <= 30) return '30px';
//   return '40px';
// };*/}


export default function ChallengeStarterModal(props) {
  const [selectedTime, setSelectedTime] = useState('1 week');

  const movie =props.selectedMovie;
  const selectedFriend=props.selectedFriend;

  const handleTimeChange = (event) => {
    console.log(movie);
    setSelectedTime(event.target.value);
  };

  const handleCreateNewChallenge = async () => {
    try {
      console.log(movie.id,selectedTime,selectedFriend.id);
      await createNewChallenge(movie.id,selectedTime,selectedFriend.id);
      props.onClose();
      toast.success("Yeni meydan okuma gönderildi.");
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <Modal open={props.open} onClose={props.onClose}
    >
      <Box sx={style}>
        {/* Başlık */}
       
        {/* Alt: Poster + Bilgi Alanı */}
        <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1, gap: 3 }}>
          {/* Sol: Poster */}
          <Box
            component="img"
            src={movie?.poster_url}
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
          
{/*<Typography
  sx={{
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: getDynamicFontSize(movie?.title),
    fontWeight: 'bold',
    color: 'rgba(61, 61, 61, 0.58)',
    zIndex: 0,
    pointerEvents: 'none',
    userSelect: 'none',
  }}
>
    {movie?.title?.toUpperCase()}
  </Typography> minimize   */}
   <Typography variant="h3" fontWeight="bold" mb={1.1} sx={{textAlign:"center"}}>
          CREATE CHALLENGE
        </Typography>

  <Box sx={{alignContent:"center", height:"400px"}}> 
            <Box sx={{ mb: 2,display:"flex", flexDirection:"row", alignContent:"center" }}>
              <Typography variant="body1" width="150px"  sx={{alignSelf:"center"}}>Movie Name:</Typography>
              <TextField
                fullWidth
                value={movie?.title}
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
                value={ selectedFriend?.name +" "+selectedFriend?.surname }
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
                  <MenuItem value="1440">1 day</MenuItem>
                  <MenuItem value="4320">3 days</MenuItem>
                  <MenuItem value="10080">1 week</MenuItem>
                  <MenuItem value="20160">2 weeks</MenuItem>
                </Select>
              </FormControl>
            
              </Box>
            {/* Butonlar */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 'auto' }}>
              <Button
              onClick={handleCreateNewChallenge}
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