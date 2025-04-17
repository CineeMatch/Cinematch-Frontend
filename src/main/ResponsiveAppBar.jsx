import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Notifications from "./Notifications.jsx"
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { useNavigate } from 'react-router-dom';

const settings = ['Profile', 'Logout'];
const myList = [{ title: 'Favorites', to: "/favorites" },
  { title: 'Wishlist', to: "/wishlist" },
  { title: 'Watched', to: "/watched" },]

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElNavLists, setAnchorElNavLists] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const pages = [
    { title: 'Home', to: "/home" },
    { title: 'Community', to: "/community" },
    { title: 'My List', to: "/favorites" },
    { title: 'Comatch', to: "/comatch" },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenNavListMenu = (event) => {
    setAnchorElNavLists(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    width: '100%',
    transition: theme.transitions.create(['background-color', 'width'], {
      duration: theme.transitions.duration.short,
    }),
    backgroundColor: 'transparent',
    '&:focus-within': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      backgroundColor: 'transparent',
      [theme.breakpoints.up('sm')]: {
        width: '0ch',
        '&:focus': {
          width: '100vh',
        },
      },
    },
  }));

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "rgb(0,0,0)" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              CineMATCH
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              CineMATCH
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                page.title === 'My List' ? (
                  <Button
                    id="mylist-button"
                    key={page.title}
                    onClick={handleOpenNavListMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page.title}
                  </Button>
                ) : (
                  <Button
                    key={page.title}
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate(page.to);
                    }}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page.title}
                  </Button>
                )
              ))}
            </Box>

            <Search>
              <SearchIconWrapper><SearchIcon /></SearchIconWrapper>
              <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
            </Search>

            <Notifications />
            <ChatBubbleIcon sx={{ paddingRight: "10px" }} />

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* My List Drop-down */}
      <Menu
        id="mylist-menu"
        anchorEl={anchorElNavLists}
        open={Boolean(anchorElNavLists)}
        onClose={() => setAnchorElNavLists(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        MenuListProps={{
          'aria-labelledby': 'mylist-button',
          sx: {
            backgroundColor: '#121212',
            color: 'white',
            borderRadius: 1,
            boxShadow: '0 0 10px rgba(255,255,255,0.1)',
            py: 1,
          }
        }}
      >
      
        {myList.map((item) => (
          <MenuItem
            key={item}
            onClick={() => {
              setAnchorElNavLists(null);
              navigate(item.to);
            }}
            sx={{
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
              px: 3,
              py: 1,
            }}
          >
            <Typography textAlign="left" fontWeight={500}>{item.title}</Typography>
          </MenuItem>
        ))}
      </Menu>

      {/* gradient bar under AppBar */}
      <Box
        sx={{
          position: "absolute",
          top: 67,
          left: 0,
          width: "100%",
          height: "30px",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.9), transparent)",
          backdropFilter: "blur(0.2px)",
          zIndex: 10,
        }}
      />
    </>
  );
}

export default ResponsiveAppBar;