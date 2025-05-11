import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  background: 'rgba(59, 7, 7, 0.9)', // koyu kırmızımsı şeffaf zemin
  color: '#fff',
  border: '2px solid rgba(255, 0, 0, 0.5)',
  borderRadius: '12px',
  boxShadow: '0 0 20px rgba(255, 0, 0, 0.7)',
  backdropFilter: 'blur(8px)', // arka planı yumuşatır
  p: 4,
};

const EditProfileModal = ({ setIsShowEditProfileModal, avatar, nickname, name, description }) => {
    
    const [newAvatar, setNewAvatar] = useState(avatar);
    const [newName, setNewName] = useState(name);
    const [newNickname, setNewNickname] = useState(nickname);
    const [newDescription, setNewDescription] = useState(description);

    const handleSave = () => {
        const updatedData = {newAvatar, newName, newNickname, newDescription };
        console.log('Updated Data:', updatedData);
        handleClose();
    };

    const handleClose = () => {
        setIsShowEditProfileModal(false);
    }

    return (
        <Modal open={true} onClose={handleClose}>
        <Box sx={modalStyle}>
            <Typography variant="h6" mb={2} fontWeight="bold">Edit Profile</Typography>
            <TextField
                label="Name"
                variant="outlined"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                fullWidth
                sx={{
                    mb: 2,
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
                    }
                }}
            />
            <TextField
                fullWidth
                label="nickname"
                variant="outlined"
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
                sx={{
                    mb: 2,
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
                    }
                }}
            />
            <TextField
                fullWidth
                label="Description"
                variant="outlined"
                multiline
                rows={3}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                sx={{
                    mb: 2,
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
                    }
                }}
            />
            <Button variant="contained" color="primary" fullWidth onClick={handleSave} sx={{backgroundColor: '#b71c1c', '&:hover': {backgroundColor: '#c62828' }}}>
                Save Changes
            </Button>
        </Box>
        </Modal>
    );
}

export default EditProfileModal;