import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import ChildModal from './ChildModal';
import ListMenu from './ListMenu';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 500,
  boxShadow: 24,
  p: 0,
  border: 'none',
};

const dummyMovie = {
  image: '/images/dummymoviemodal.png',
  name: 'SHREK',
  stars: 'Mike Myers, Eddie Murphy, Cameron Diaz',
  directors: 'Andrew Adamson, Vicky Jenson',
  description: 'A mean lord exiles fairytale creatures to the swamp of a grumpy ogre, who must go on a quest and rescue a princess for the lord in order to get his land back.',
  genres: 'Animation, Adventure, Comedy, Family, Fantasy, Romance',
  duration: '1h 30m',
  year: '2001',
  platform: 'Netflix',
  age: '+7',
};
export default function MovieModal(props) {
  const [openChildFriendsModal,setOpenChildOpenFriendsModal]=React.useState(false);
  const movie= props.movie;
  const hour=movie.duration/60;
  const min=movie.duration%60;

  return (
    <div>
      <ChildModal open={openChildFriendsModal} onClose={()=>setOpenChildOpenFriendsModal(false)}/>
          <Modal open={props.open} onClose={props.onClose}>
        <Box sx={style}>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${movie.background_url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
            }}
          >
            <Box
  sx={{
    position: 'absolute',
    top: '55%',
    left: 0,
    transform: 'translateY(-50%)',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))',
    height:"20%",
    width: 700,
  }}
></Box>
            <Box
  sx={{
    position: 'absolute',
    top: '50%',
    left: 16,
    transform: 'translateY(-50%)',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '90%',
  }}
>

              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{ textShadow: '2px 2px 6px rgba(0,0,0,0.8)' }}
              >
                {dummyMovie.name}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: 'white',
                    color: 'black',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    padding: '4px 8px',
                    borderRadius: '4px',
                  }}
                >{"platformu boş geliyormuş"}
                  You can watch it on
                </Button>

                <Box sx={{ display: 'flex', gap: 1, ml: 1 }}>
                  <AddCircleIcon sx={{ color: 'white' }} />
                  <ListMenu/>
                  <OfflineBoltIcon sx={{ color: 'white' }} onClick={()=>setOpenChildOpenFriendsModal(true)}/>
                </Box>
              </Box>
            
            </Box>

            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                width: 770,
                height: '30%',
                background: "black",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '16px',
                color: 'white',
              }}
            >
              {/* Year - Duration - Age */}
              <Box sx={{ display: "flex", justifyContent: "space-between", width: "165px" }}>
                <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "12px" }}>{movie.release_year}</Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "12px" }}>{`${hour}h ${min}m`}</Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "12px" }}>{movie.age_rating}</Typography>
              </Box>

              {/* Description + Details */}
              <Box sx={{ display: "flex", flexDirection: "row", paddingTop: 1 }}>
                <Box sx={{ width: "390px", paddingRight: "10px" }}>
                  <Typography sx={{fontSize:"15px",color:"rgba(255,255,255,0.9)"}}>{movie.description}</Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography sx={{  fontStyle: 'italic',fontSize:"15px",color:"rgba(255,255,255,0.9)" }}><strong>Genres:</strong> {dummyMovie.genres}</Typography>
                  <Typography sx={{ mt: 1 ,fontSize:"15px",color:"rgba(255,255,255,0.9)"}}><strong>Stars:</strong> {dummyMovie.stars}</Typography>
                  <Typography sx={{ mt: 1 ,fontSize:"15px",color:"rgba(255,255,255,0.9)"}}><strong>Directors:</strong> {dummyMovie.directors}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
