import React, { useEffect, useState } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  Badge,
  Box,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import FlashOnRoundedIcon from "@mui/icons-material/FlashOnRounded";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import SentimentVeryDissatisfiedRoundedIcon from "@mui/icons-material/SentimentVeryDissatisfiedRounded";
import { deleteNotification, getNotfications, updatetoRead } from "../../api/notifications/notification.js";
import { acceptFriendRequest, deleteFriendById } from "../../api/profile/friends.js";
import { useNavigate } from "react-router-dom";

export default function Notifications() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  useEffect(()=>{
fetchNotifications();
  },[]);

  const notificationTypes = [
    {
      id: 1,
      icon: <PersonAddAlt1RoundedIcon />,
      route:"/"
    },
    {
      id: 2,
      icon: <ThumbUpAltRoundedIcon />,
       route:"/community"
    },
    {
      id: 3,
      icon: <FlashOnRoundedIcon />,
       route:"/activeChallenge"
    },
    {
      id: 4,
      icon: <CommentRoundedIcon />,
       route:"/community"
    },
    {
      id: 5,
      icon: <EmojiEventsRoundedIcon />,
      route:"/activeChallenge"
    },
    {
      id: 6,
      icon: <SentimentVeryDissatisfiedRoundedIcon />,
      route:"/activeChallenge"
    },
  ];

  const getType = (typeId) => {
    const match = notificationTypes.find((type) => type.id === typeId);
    return match || null;
  };
   const fetchNotifications = async () => {
  const notificationsResult = await getNotfications();
  if (notificationsResult) {
    const sortedNotifications = notificationsResult.sort((a, b) => {
      return a.isRead === b.isRead ? 0 : a.isRead ? 1 : -1;
    });
    setNotifications(sortedNotifications);
    console.log("Sorted Notifications:", notifications);
    console.log("sorted:",sortedNotifications);
  }
};

  const handleClick = async (event) => {
    setAnchorEl(event.currentTarget);
   fetchNotifications();
  };
  const handleClickMenuItem= async(id,route)=>{
    navigate(route);
    await updatetoRead(id);
    handleClose();

  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  const addFriend=async (notificationId,friendId)=>{
    console.log("frinedId",friendId);
    await acceptFriendRequest(friendId);
    await deleteNotification(notificationId);
    handleClose();
  }
  const deleteFriend=async(notificationId,friendId)=>{
    console.log(friendId);
    await deleteFriendById(friendId);
    await deleteNotification(notificationId);
    handleClose();
  }
 

  
  return (
    <Box sx={{ paddingRight: "10px" }}>
      <IconButton color="inherit" onClick={handleClick} >
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
            width: "400px",
            height: "130px",
          },
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
          notifications.map((notif) => {
            const type = getType(notif.type.id);
            const icon=type?.icon;
            const route=type?.route;
            return (
              <MenuItem
                key={notif.id}
                sx={{
                  color: "white",
                  backgroundColor: "rgba(45, 45, 45, 0.7)",
                  marginTop: "2px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  minHeight: "auto",
                }}
                
              >
                <Box onClick={()=>handleClickMenuItem(notif.id,route)}  sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {icon}
                  <Typography variant="body2">
                    {notif.sender.nickname} {notif.type.messageContent}
                  </Typography>
                </Box>
               {notif.type_id===1&&<Box sx={{ display: "flex", gap: 1 }}>
                  <CheckCircleRoundedIcon
                   
                    sx={{
                      color: "rgba(52, 136, 16, 0.63)",
                      outline: "1px white",
                      padding:"3px",
                      cursor: "pointer",
                     
                    }}
                    onClick={()=>{
                      console.log("onAddClick",notif.sender_id);
                      addFriend(notif.id,notif.sender_id);
                    }}
                  />
                  <CancelRoundedIcon
                    sx={{
                      color: "rgba(123, 18, 18, 0.63)",
                      outline: "1px white",
                      padding:"3px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      console.log(notif.sender_id,notif.id);
                      deleteFriend(notif.id,notif.sender_id)}}
                  />
                </Box>}
              </MenuItem>
            );
          })
        ) : (
          <MenuItem onClick={handleClose}>
            <Typography variant="body2">Hiç bildirimin yok</Typography>
            <CheckCircleRoundedIcon />
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
}