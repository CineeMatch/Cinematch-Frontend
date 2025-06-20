import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography } from '@mui/material';
import { addFriendByNickname } from '../../api/profile/friends';

const AddFriendModal = ({ setIsShowAddFriendModal }) => {
  const [nickname, setNickname] = useState('');

  const handleAdd = () => {

    if (!nickname) {
        alert('Please enter a nickname.');
        return;
    }

    const fetchData = async (data) => {
        try {
            const response = await addFriendByNickname(data);
            console.log('Friend added:', response.message);
        } catch (error) {
            console.error('Error adding friend:', error.response.data.message);
            alert('Failed to add friend. Please try again.');
        }
    }
    fetchData(nickname);
    // Burada nickname ile arkadaş ekleme işlemi yapılabilir
    handleClose();
  };

  const handleClose = () => {
    setIsShowAddFriendModal(false);
  };

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      PaperProps={{
        style: {
          height: 'auto',
          width: 400,
          background: 'rgba(59, 7, 7, 0.9)', // koyu kırmızımsı şeffaf zemin
        color: '#fff',
        border: '2px solid rgba(255, 0, 0, 0.5)',
        borderRadius: '12px',
        boxShadow: '0 0 20px rgba(255, 0, 0, 0.7)',
        backdropFilter: 'blur(8px)', // arka planı yumuşatır
        p: 4,
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h6" sx={{ color: '#fff' }}>
          Add a Friend by Nickname
        </Typography>
      </DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Nickname"
          type="text"
          fullWidth
          variant="outlined"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          InputLabelProps={{ style: { color: '#ccc' } }}
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
            },
            input: { color: 'white' }, fieldset: { borderColor: 'gray' }
        }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} sx={{ color: '#ccc' }}>
          iptal
        </Button>
        <Button
          onClick={handleAdd}
          variant="contained"
          sx={{
            backgroundColor: '#e50914', // Netflix kırmızısı
            '&:hover': {
              backgroundColor: '#b00610',
            },
          }}
        >
          Arkadaş Ekle
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFriendModal;
