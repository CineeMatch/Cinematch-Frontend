import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { uploadUserAvatar } from '../../api/profile/user';
import { toast } from 'react-toastify';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  backgroundColor: 'rgba(76, 2, 2, 0.7)',
  color: '#fff',
  border: '2px solid rgba(255, 0, 0, 0.5)',
  borderRadius: '12px',
  boxShadow: '0 0 20px rgba(255, 0, 0, 0.7)',
  backdropFilter: 'blur(8px)',
  p: 4,
};

const textFieldStyles = {
  mb: 2,
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: 'rgba(255, 0, 0, 0.5)' },
    '&:hover fieldset': { borderColor: 'red' },
    '&.Mui-focused fieldset': { borderColor: '#f44336' },
  },
  '& .MuiInputLabel-root.Mui-focused': { color: '#f44336' },
  input: { color: 'white' },
  fieldset: { borderColor: 'gray' },
};

const inputStyle = {
  color: 'white',
  backgroundColor: 'transparent',
  border: '1px solid rgba(255, 0, 0, 0.5)',
  padding: '8px',
  borderRadius: '4px',
  width: '100%',
};

const EditProfileModal = ({
  setIsShowEditProfileModal,
  avatar,
  nickname,
  name,
  description,
  onAvatarUpdate,
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [avatarBase64, setAvatarBase64] = useState(null);
  const [newName, setNewName] = useState(name);
  const [newNickname, setNewNickname] = useState(nickname);
  const [newDescription, setNewDescription] = useState(description);
  const [isSaving, setIsSaving] = useState(false);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64Image = await convertToBase64(file);
        setSelectedAvatar(base64Image);
        setAvatarBase64(base64Image);
      } catch (error) {
        console.error("Error converting image to Base64:", error);
        toast.error("Avatar yüklenirken bir hata oluştu. Lütfen tekrar deneyin.");
      }
    }
  };

  const handleClose = () => {
    setIsShowEditProfileModal(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      let uploadedAvatarUrl = avatar;

      if (avatarBase64) {
        const response = await uploadUserAvatar({ url: avatarBase64 });
        uploadedAvatarUrl = response.avatarUrl;
        onAvatarUpdate(uploadedAvatarUrl); // <-- ✅ Güncelleme burada tetikleniyor
      }

      // Burada name, nickname, description backend’e gönderilmiyor ama UI içinde tutuluyor
      console.log("Updated Data:", {
        avatar: uploadedAvatarUrl,
        name: newName,
        nickname: newNickname,
        description: newDescription,
      });

      handleClose();
    } catch (error) {
      console.error("Error uploading avatar:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal open={true} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" mb={2} fontWeight="bold">Profil Güncelle</Typography>

        <TextField
          label="Name"
          variant="outlined"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          fullWidth
          sx={textFieldStyles}
        />

        <TextField
          fullWidth
          label="Nickname"
          variant="outlined"
          value={newNickname}
          onChange={(e) => setNewNickname(e.target.value)}
          sx={textFieldStyles}
        />

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" mb={1} sx={{ color: 'white' }}>
            Avatar Yükle
          </Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            style={inputStyle}
          />
        </Box>

        <Box mt={1} mb={2} sx={{ display: 'flex', justifyContent: 'center' }}>
          <img
            src={selectedAvatar || avatar}
            alt="Avatar Preview"
            style={{
              maxWidth: '100px',
              maxHeight: '100px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
        </Box>

        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          multiline
          rows={3}
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          sx={textFieldStyles}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSave}
          disabled={isSaving}
          sx={{
            backgroundColor: '#b71c1c',
            '&:hover': { backgroundColor: '#c62828' },
            fontWeight: 'bold',
          }}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </Box>
    </Modal>
  );
};

export default EditProfileModal;
