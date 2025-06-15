import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';
import { addtoFavoriteMovies, addtoWatchedMovies, addtoWishlistMovies, getMyListMovie, removefromFavorites, removefromMylist } from '../../api/movieType/movieType';

export default function ListMenu(props) {
  const movie = props.movie;
  const statusOfMovie=props.statusOfMovie;

  const unSelectedItem = {
    color: "black",
    backgroundColor: "white"
  };

  const selectedItem = {
    color: "white",
    backgroundColor: "black"
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  

  const handleMenuItemClick = async (typeKey) => {
    if(typeKey==="favorite")
      statusOfMovie?.favoriteMovies ?  await removefromFavorites(movie.id):await addtoFavoriteMovies(movie.id);
    if(typeKey==="watched")
      statusOfMovie?.watchedMovies ? await removefromMylist(movie.id): await addtoWatchedMovies(movie.id);
    if(typeKey==="wishlist")
      statusOfMovie?.wishlistMovies ? await removefromMylist(movie.id):  await addtoWishlistMovies(movie.id);
    props.setClicked(prev => !prev);
    handleClose();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* Menü Açma Butonu */}
      <IconButton
        id="positioned-button"
        onClick={handleClick}
        aria-controls={open ? 'positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{ color: 'white' }}
      >
        <AddCircleIcon />
      </IconButton>

      {/* Menü */}
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
        <MenuItem
          sx={statusOfMovie?.favoriteMovies ? selectedItem : unSelectedItem}
          onClick={() => handleMenuItemClick("favorite")}
        >
          Favorite
        </MenuItem>

        <MenuItem
          sx={statusOfMovie?.wishlistMovies ? selectedItem : unSelectedItem}
          onClick={() => handleMenuItemClick("wishlist")}
        >
          WishList
        </MenuItem>

        <MenuItem
          sx={statusOfMovie?.watchedMovies ? selectedItem : unSelectedItem}
          onClick={() => handleMenuItemClick("watched")}
        >
          Watched
        </MenuItem>
      </Menu>
    </div>
  );
}
