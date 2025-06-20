import React, { useState, useEffect } from 'react';
import { getCurrentUserFriendsList } from "../../api/profile/friends.js";
import {
  Box,
  Typography,
  TextField,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Modal,
} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import ChallengeStarterModal from '../../modals/challenge/ChallengeStarterModal.jsx';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 250,
  height: 300,
  boxShadow: 24,
  p: 0,
  border: 'none',
  background: 'linear-gradient(to right, rgb(0,0,0), rgba(0,0,0,0.6))',
  color: 'white',
  padding: 2,
  borderRadius: 2,
};

export default function ChildModal(props) {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [openChallengeModal, setOpenChallengeModal] = useState(false);
  const [friends, setFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const movie=props.movie;

  useEffect(() => {
    fetchUserFriendList();
  }, []);

  const fetchUserFriendList = async () => {
    try {
      const friends = await getCurrentUserFriendsList();
      setFriends(friends);
    } catch (error) {
      console.log("friends fetching error");
      toast.error("Arkadaş listesi alınamadı. Lütfen tekrar deneyiniz.");
    }
  };

  const handleSelectFriend = (friend) => {
    console.log(friend);
    setSelectedFriend(friend);
    console.log(movie);
    setOpenChallengeModal(true);
  };

  const handleCloseChallengeModal = () => {
    setOpenChallengeModal(false);
    props.onClose();
  };

  const filteredFriends = friends.filter((friend) =>
    friend.nickname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1} sx={{ paddingTop: '10px' }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: 18 }}>Arkadaşlarım</Typography>
            <GroupIcon />
          </Stack>

          <TextField
            placeholder="Arkadaşını seç"
            variant="outlined"
            fullWidth
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              input: { color: 'white' },
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: 1,
                '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                '&:hover fieldset': { borderColor: 'white' },
              },
              mb: 2,
            }}
          />

          {/* Scrollable List */}
          <List
             sx={{
    maxHeight: '160px',
    overflowY: 'auto',
    pr: 1,
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#888',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#555',
    },
  }}
          >
            {filteredFriends.map((friend, index) => (
              <ListItem
                sx={{
                  backgroundColor: "rgba(146, 23, 23, 0.22)",
                  marginBottom: "3px",
                  borderRadius: "5px"
                }}
                button
                key={index}
                onClick={() => handleSelectFriend(friend)}
              >
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <ListItemText primary={friend.nickname} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>

      <ChallengeStarterModal
      selectedMovie={movie}
        open={openChallengeModal}
        onClose={handleCloseChallengeModal}
        selectedFriend={selectedFriend}
      />
    </>
  );
}
