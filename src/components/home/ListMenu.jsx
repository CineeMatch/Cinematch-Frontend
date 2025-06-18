import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close'; // <-- X ikonu
import { useState } from 'react';
import {
  addtoFavoriteMovies,
  addtoWatchedMovies,
  addtoWishlistMovies,
  removefromFavorites,
  removefromMylist
} from '../../api/movieType/movieType';

export default function ListMenu(props) {
  const { movie, statusOfMovie, setClicked, fontSize } = props;

  const menuItemStyle = {
    color:  "black",
    backgroundColor: "white",
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuItemClick = async (typeKey) => {
    if (typeKey === "favorite")
      statusOfMovie?.favoriteMovies
        ? await removefromFavorites(movie.id)
        : await addtoFavoriteMovies(movie.id);
    if (typeKey === "watched")
      statusOfMovie?.watchedMovies
        ? await removefromMylist(movie.id)
        : await addtoWatchedMovies(movie.id);
    if (typeKey === "wishlist")
      statusOfMovie?.wishlistMovies
        ? await removefromMylist(movie.id)
        : await addtoWishlistMovies(movie.id);

    setClicked(prev => !prev);
    handleClose();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderMenuItem = (label, typeKey, isSelected) => (
    <MenuItem
      sx={menuItemStyle}
      onClick={() => handleMenuItemClick(typeKey)}
    >
      <span>{label}</span>
      {isSelected && <CloseIcon sx={{ fontSize: 18, marginLeft: 1 }} />}
    </MenuItem>
  );

  return (
    <div>
      <IconButton
        onClick={handleClick}
        sx={{ color: 'white' }}
      >
        <AddCircleIcon sx={{ fontSize }} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        sx={{ color: "black" }}
      >
        {renderMenuItem("Favorite", "favorite", statusOfMovie?.favoriteMovies)}
        {renderMenuItem("WishList", "wishlist", statusOfMovie?.wishlistMovies)}
        {renderMenuItem("Watched", "watched", statusOfMovie?.watchedMovies)}
      </Menu>
    </div>
  );
}
