import { useState } from 'react';
import { Modal, Box, Typography, TextField, Button,} from '@mui/material';
import { createBadge } from '../../api/badge/badge';
import { toast } from 'react-toastify';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  background: 'rgba(59, 7, 7, 0.9)',
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

const CreateBadgeModal = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [avatarBase64, setAvatarBase64] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
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
        
  const handleSave = async () => {
    setIsSaving(true);
    try {

      if (avatarBase64) {
        const response = await createBadge({ image: avatarBase64, name, description });
        console.log("Avatar uploaded successfully:", response);

      }

    } catch (error) {
      console.error("Error uploading avatar:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal open={true}>
      <Box sx={modalStyle}>
        <Typography variant="h6" mb={2} fontWeight="bold">Edit Profile</Typography>

        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          sx={textFieldStyles}
        />

        <TextField
        fullWidth
        label="Description"
        variant="outlined"
        multiline
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={textFieldStyles}
        />

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" mb={1} sx={{ color: 'white' }}>
            Upload Avatar
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
            src={selectedAvatar}
            alt="Avatar Preview"
            style={{
              maxWidth: '100px',
              maxHeight: '100px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
        </Box>

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

export default CreateBadgeModal;
