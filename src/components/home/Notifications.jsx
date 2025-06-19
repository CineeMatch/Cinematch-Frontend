import React, { useState } from "react";
import { Menu, MenuItem, IconButton, Badge, Box, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { getNotfications } from "../../api/notfications/notification";



export default function Notifications () {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);


  const handleDeleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const handleClick =async (event) => {
    setAnchorEl(event.currentTarget);
    const notificationsResult=await getNotfications();
    notificationsResult&&setNotifications(notificationsResult);
    console.log("notifications:",notificationsResult);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
const [notifications, setNotifications] = useState([
]);
  return (
    <Box
    sx={{paddingRight:"10px"}}
    >
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
      PaperProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.9)", 
          color: "white",                         
          borderRadius: 1,
          width:"400px"
          
        }
      }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        
      >
        {notifications.length > 0 ? (
  notifications.map((notif) => (
    <MenuItem
      key={notif.id}
      sx={{
        color: "white",
        backgroundColor: "rgba(45, 45, 45, 0.7)",
        marginTop: "2px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight:"auto"
      }}
    >
      <Typography variant="body2">{notif.text}</Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        <CheckCircleRoundedIcon
          sx={{
            color: "rgba(52, 136, 16, 0.63)",
            outline: "1px white",
            cursor: "pointer",
          }}
          onClick={handleClose}
        />
        <CancelRoundedIcon
          sx={{
            color: "rgba(123, 18, 18, 0.63)",
            outline: "1px white",
            cursor: "pointer",
          }}
          onClick={() => handleDeleteNotification(notif.id)}
        />
      </Box>
    </MenuItem>
  ))
) : (
  <MenuItem onClick={handleClose}>
    <Typography variant="body2">Hiç bildirimin yok</Typography>
    <CheckCircleRoundedIcon />
  </MenuItem>
)}
      </Menu>
    </Box>
  );
};

