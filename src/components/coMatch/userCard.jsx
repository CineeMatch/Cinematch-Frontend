import React from "react";
import { Button, Card } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Avatar from "@mui/material/Avatar";
import { addFriendByNickname, getFriendshipStatus } from "../../api/profile/friends";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

export default function UserCard({ user }) {
  const [status, setStatus] = useState(""); 

useEffect(() => {
    const fetchFriendshipStatus = async () => {
      try {
        const response = await getFriendshipStatus(user.id);
        const _status= response.status; 
        console.log('Friendship status:', _status);
        setStatus(_status);
      } catch (error) {
        console.error('Error fetching friendship status:', error);
        setStatus("");
        toast.error('Arkadaşlık durumu alınamadı. Lütfen daha sonra tekrar deneyin.');
      }
    };
    fetchFriendshipStatus();
  }, [user]);


    const handleAddFriend = () => {
  
      if (!user.nickname) {
          alert('Please enter a nickname.');
          return;
      }
  
      const fetchData = async (data) => {
          try {
              const response = await addFriendByNickname(data);
             console.log('Friend request sent:', user);
              setStatus("pending");
              console.log('Friend added:', response.message);
          } catch (error) {
              console.error('Error adding friend:', error.response.data.message);
              toast.error(error.response.data.message);
          }
      }
      fetchData(user.nickname);
    };

let buttonLabel = "Arkadaş Ekle";
if (status === "accepted") buttonLabel = "Arkadaş Ekli";
else if (status === "pending") buttonLabel = "Beklemede";
  
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        height: 450,
        width: 350,
        p: 2,
        borderRadius: 3,
        boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.5)",
        bgcolor: "rgba(0, 0, 0, 0.6)",
        color: "white",
        position: "relative",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Avatar
          src={user.profile_image_url}
          alt={user.name}
          sx={{
            width: 300,
            height: 300,
            borderRadius: 10,
            border: "4px solid rgb(205, 182, 182)",
            ml: 1, // Avatar ile kart arasına boşluk bırak
            mb: 2, // Altına boşluk bırak
          }}
        />
        <Box
          sx={{
            mt: 2, // Avatar ile arasına boşluk ekler
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // Yatayda ortala
            gap: 0.5, // İsim ve nickname arasına boşluk ekle
            bottom: 10,
            left: 10,
            p: 1,
          }}
        >
          <Typography variant="h6" fontWeight="bold" color="white">
            {user.name}
          </Typography>
          <Typography variant="body2" color="gray">
            {user.nickname}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 7,
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              color="white"
              sx={{
                borderRadius: 3,
                borderColor: "rgb(115, 193, 202)",
                border: "1px solid",
                width: 100,
                height: 40,
                backgroundColor: "rgb(166, 46, 48)",
                mt: 2,
                color: "rgb(115, 193, 202)",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "flex-start",
              }}
            >
              Level : {user.level}
            </Typography>
            <Button
              onClick={status === "accepted" || status === "pending" ? undefined : handleAddFriend}
              variant="contained"
              color="primary"
              startIcon={<PersonAddIcon />} 
              sx={{
                mt: 2,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                 backgroundColor:
                  status === "pending" || status === "accepted"
                    ? "gray"
                    : "rgb(33, 80, 146)",
                pointerEvents:
                  status === "accepted" || status === "pending" ? "none" : "auto",
                cursor:
                  status === "accepted" || status === "pending" ? "default" : "pointer",
                "&:hover": {
                  backgroundColor:
                    status === "accepted" || status === "pending"
                      ? "gray"
                      : "rgb(23,40,43)",
                },
              }}
            >
              {buttonLabel}
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
