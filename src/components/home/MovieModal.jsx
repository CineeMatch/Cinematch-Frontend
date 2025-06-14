import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
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


export default function MovieModal(props) {

  const [openChildFriendsModal,setOpenChildOpenFriendsModal]=React.useState(false);
  const movie= props.movie;
  if (!movie) return null;
  console.log("açıldık")
  console.log("movie",movie);
  const hour=parseInt(movie.duration/60);
  const min=movie.duration%60;
const platforms=[
    {name:"Netflix",url:"https://www.netflix.com/tr/"},
    {name:"Disney Plus",url:"https://www.disneyplus.com/tr"},
    {name:"Amazon Prime Video",url:"https://www.primevideo.com/tr"},
    {name:"blutv",url:"https://www.max.com/tr"},
    {name:"TV+",url:"https://tvplus.com.tr"},
    {name:'TOD TV',url:"https://www.todtv.com.tr"},
    {name:"MUBI",url:"https://tvplus.com.tr"},
    {name:"Sun Nxt",url:"https://www.sunnxt.com"},
    {name:"DocAlliance Films",url:"https://dafilms.com"},
    {name:"Cultpix",url:"https://www.cultpix.com"}
  ]
  console.log("typeof movie.platforms:", typeof movie.platforms);

const moviePlatforms = typeof movie.platforms === 'string'
  ? movie.platforms.split(',').map(p => p.trim())
  : [];const platformURL = platforms.find(p => p.name === moviePlatforms[0])?.url;
console.log("movie.platforms:", movie.platforms);
console.log("platformURL:", platformURL);

  return (
    <div>
      <ChildModal open={openChildFriendsModal} onClose={()=>setOpenChildOpenFriendsModal(false)}/>
          <Modal open={props.open} onClose={props.onClose}>
        <Box sx={style}>
          <Box
            sx={{
              padding:"10px",
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
    height:"10%",
    width: 900,
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
                fontSize="30px"
                fontWeight="bold"
                sx={{ textShadow: '2px 2px 6px rgba(0,0,0,0.8)' }}
              >
                {movie.title}
              </Typography>

             <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
             
                {movie?.platforms?.[0] && (<Button
                 onClick={()=>{window.open(platformURL, "_blank");console.log("platforlmurl:",platformURL)}}
                  variant="contained"
                  sx={{
                    backgroundColor: 'white',
                    color: 'black',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    padding: '4px 16px',
                    borderRadius: '4px',
                  }}
                >
                You can watch it on {moviePlatforms[0]}       </Button>)}

                <Box sx={{ display: 'flex', gap: 1, ml: 1 }}>
                  <ListMenu/>

                  <ThumbUpIcon sx={{ color: 'white', padding:"8px"}} />
                  <OfflineBoltIcon sx={{ color: 'white' , padding:"8px"}} onClick={()=>setOpenChildOpenFriendsModal(true)}/>
                </Box>
              </Box>
            
            </Box>

            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                padding:"16px",
                width: 790,
                height: '34%',
                background: "black",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                color: 'white',
                left:0
              }}
            >
              {/* Year - Duration - Age */}
              <Box sx={{ display: "flex", justifyContent: "space-between", width: "165px" }}>
                <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "12px" }}>{movie.release_year}</Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "12px" }}>{`${hour}h ${min}m`}</Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "12px" }}>{movie.age_rating}</Typography>
              </Box>

              {/* Description + Details */}
<Box sx={{ display: "flex", flexDirection: "row", paddingTop: 1, alignItems: 'flex-start' }}>
  {/* Sol taraf: Scrollable Description */}
  <Box
  sx={{
    width: "390px",
    paddingRight: "10px",
    maxHeight: "140px",
    overflowY: "auto",
    pr: 1,
    scrollbarWidth: "none",
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    boxSizing: "border-box",
  }}
>
    <Typography
      sx={{
        fontSize: "15px",
        color: "rgba(255,255,255,0.9)",
        whiteSpace: "pre-line",
      }}
    >
      {movie.description? movie.description:"Bu film için açıklama bulamadık."}
    </Typography>
  </Box>

  {/* Sağ taraf: Statik bilgiler */}
  <Box sx={{ display: "flex", flexDirection: "column" }}>
    <Typography
      sx={{
        fontStyle: 'italic',
        fontSize: "15px",
        color: "rgba(255,255,255,0.9)",
      }}
    >
      <strong>Genres:</strong> {movie.categories}
    </Typography>
    <Typography
      sx={{
        mt: 1,
        fontSize: "15px",
        color: "rgba(255,255,255,0.9)",
      }}
    >
      <strong>Stars:</strong> {movie.actor}
    </Typography>
    <Typography
      sx={{
        mt: 1,
        fontSize: "15px",
        color: "rgba(255,255,255,0.9)",
      }}
    >
      <strong>Directors:</strong> {movie.director}
    </Typography>
  </Box>
</Box>

          </Box>
        </Box>
        </Box>
      </Modal>
    </div>
  );
}
