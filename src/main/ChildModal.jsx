import React, { useState } from 'react';
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
import ChallengeStarterModal from '../Challenge/ChallengeStarterModal'; 

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
};

export default function ChildModal(props) {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [openChallengeModal, setOpenChallengeModal] = useState(false);

  const friends = [
    { name: 'Sena Akat' },
    { name: 'Abdullah Can' },
    { name: 'Ebrar Taşdemir' },
  ];

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend.name);
    setOpenChallengeModal(true); // 🎯 Challenge modalını aç
  };

  const handleCloseChallengeModal = () => {
    setOpenChallengeModal(false);
    props.onClose(); // Tüm akış tamamlanınca child'ı da kapat
  };

  return (
    <>
      {/* Arkadaş Seçim Modali */}
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            width: 200,
            background: 'linear-gradient(to right, rgb(0,0,0), rgba(0,0,0,0.6))',
            color: 'white',
            padding: 2,
            borderRadius: 2,
            ...style,
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1} sx={{ paddingTop: '10px' }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: 18 }}>FRIENDS</Typography>
            <GroupIcon />
          </Stack>

          <TextField
            placeholder="Search for your friend"
            variant="outlined"
            fullWidth
            size="small"
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

          <List>
            {friends.map((friend, index) => (
              <ListItem button key={index} onClick={() => handleSelectFriend(friend)}>
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <ListItemText primary={friend.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>

      {/* Challenge Başlatma Modali */}
      <ChallengeStarterModal
        open={openChallengeModal}
        onClose={handleCloseChallengeModal}
        selectedFriend={selectedFriend}
      />
    </>
  );
}
