import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import IconButton from '@mui/material/IconButton';

export default function ListMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* Thumb Icon as clickable menu trigger */}
      <IconButton
        id="positioned-button"
        onClick={handleClick}
        aria-controls={open ? 'positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{ color: 'white' }}
      >
        <ThumbUpIcon />
      </IconButton>

      {/* Menu */}
      <Menu
        id="positioned-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleClose}>Favorite</MenuItem>
        <MenuItem onClick={handleClose}>WishList</MenuItem>
        <MenuItem onClick={handleClose}>Watched</MenuItem>
      </Menu>
    </div>
  );
}
