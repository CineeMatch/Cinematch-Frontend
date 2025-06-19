import React, { useEffect } from "react";
import { Box, Card, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CancelIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import BoltIcon from "@mui/icons-material/Bolt";
import EditNoteIcon from "@mui/icons-material/EditNote";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {
  getChallengeByUser,
  deleteChallenge,
  updateChallengeStatusAccepted,
} from "../../api/challenge/ActiveChallenge";
import { getUserById } from "../../api/profile/user";
import { useState } from "react";
import ChallengeQuestionStarterModal from "../challenge/ChallengeQuestionStarterModal";
import ChallengeQuestionModal from "../challenge/ChallengeQuestionModal";
import { getActiveUser } from "../../api/profile/user";

export default function ActiveChallangeCard() {
  const [confirmedCards, setConfirmedCards] = useState({});
  const [challenges, setChallenges] = useState([]);
  const [timers, setTimers] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [writeModalOpen, setWriteModalOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await getActiveUser(); // backend'den aktif kullanıcı bilgisi
        setCurrentUserId(response.id); // id ya da response.data.id olabilir
      } catch (error) {
        console.error("Aktif kullanıcı alınamadı:", error);
      }
    };

    fetchCurrentUser();
    fetchChallenges(); // buraya da çağrıyı bıraktın
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimers = {};

      challenges.forEach((card) => {
        if (card.status === "accepted" && card.endTime) {
          const now = new Date();
          const diffMs = new Date(card.endTime) - now;

          if (diffMs <= 0) {
            handleDelete(card.challenge_Id);
          } else {
            updatedTimers[card.challenge_Id] = diffMs;
          }
        }
      });

      setTimers(updatedTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, [challenges]);

  const formatDuration = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const fetchChallenges = async () => {
      try {
        const response = await getChallengeByUser();

        const enrichedChallenges = await Promise.all(
          response.challenges.map(async (challenge) => {
            console.log("Challenge:", challenge);
            const player1 = await getUserById(challenge.creator_id);
            const player2 = await getUserById(challenge.opponent_id);
            const endTime = challenge.endTime;
            console.log("End time:", endTime);

            return {
              ...challenge,
              player1: player1.name,
              player2: player2.name,
              endTime,
            };
          })
        );

        const confirmed = {};
        const initialTimers = {}; 
        const now = new Date();  
        enrichedChallenges.forEach((ch) => {
          if (ch.status === "accepted") {
            confirmed[ch.challenge_Id] = true;
           const diff = new Date(ch.endTime) - now; 
        if (diff > 0) {
          initialTimers[ch.challenge_Id] = diff; 
        }
      }
    });

        setChallenges(enrichedChallenges);
        setConfirmedCards(confirmed);
         setTimers(initialTimers);
        console.log(
          "Fetched challenges with user details:",
          enrichedChallenges
        );
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    };

  useEffect(() => { 
    fetchChallenges();
  }, []);

  const handleDelete = async (id) => {
    try {
      console.log("Deleting challenge with ID:", id);
      await deleteChallenge(id);
      setChallenges((prev) => prev.filter((item) => item.challenge_Id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleAccept = async (id) => {
    try {
      await updateChallengeStatusAccepted(id);
      await fetchChallenges();
    } catch (error) {
      console.error("Accept error:", error);
    }
  };

  return (
    <Grid container spacing={4}>
      {challenges.map((card) => (
        <Grid item xs={12} sm={6} md={3} key={card.challenge_Id}>
          <Card
            sx={{
              backgroundColor: "#222",
              color: "white",
              borderRadius: 2,
              overflow: "hidden",
              border: "1px solid #444",
              boxShadow: "0 0 5px white",
            }}
          >
            <img
              src={card.movie_poster}
              alt={card.movie_title}
              style={{
                width: "100%",
                height: "140px",
                objectFit: "cover",
              }}
            />
            <Box sx={{ height: "auto", p: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  display: "grid",
                  placeItems: "center",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  whiteSpace: "normal",
                  height: "60px",
                }}
              >
                {card.movie_title}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  mt: 1,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                  {card.player1}
                </Typography>
                <BoltIcon sx={{ color: "red", fontSize: 25 }} />
                <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                  {card.player2}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                height: "35px",
                width: "calc(100% + 2px)",
                marginLeft: "-1px",
                marginRight: "-1px",
                border: "2px",
                borderColor: "rgb(187, 170, 170)",
                borderStyle: "solid",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                py: 1,
                gap: 10,
              }}
            >
              {currentUserId !== null && !confirmedCards[card.challenge_Id] ?(
                 String(currentUserId) !== String(card.creator_id) ? (
                <>
                  <IconButton
                    onClick={() => handleDelete(card.challenge_Id)}
                    sx={{
                      borderRadius: "10px",
                      backgroundColor: "#ff4444",
                      color: "white",
                      "&:hover": { backgroundColor: "#cc0000" },
                    }}
                  >
                    <CancelIcon />
                  </IconButton>

                  <IconButton
                    sx={{
                      borderRadius: "10px",
                      backgroundColor: "#44ff44",
                      color: "white",
                      "&:hover": { backgroundColor: "#2ecc71" },
                    }}
                    onClick={() => handleAccept(card.challenge_Id)}
                  >
                    <CheckIcon />
                  </IconButton>
                </>
              ) : (
                <Typography sx={{ color: "#bbb" }}>Bekliyor...</Typography> 
                )
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    px: 3,
                  }}
                >
                  <IconButton
                    onClick={() => handleDelete(card.challenge_Id)}
                    sx={{
                      color: "#ff4444",
                      "&:hover": { color: "#cc0000" },
                    }}
                  >
                    <CancelIcon />
                  </IconButton>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#ffdf2b",
                      textShadow: `
                      0 0 6px rgba(255, 215, 0, 0.8),
                      0 0 10px rgba(255, 215, 0, 0.6)
                    `,
                      fontWeight: "bold",
                    }}
                  >
                    ⏱{" "}
                    {timers[card.challenge_Id]
                      ? formatDuration(timers[card.challenge_Id])
                      : "00:00"}
                  </Typography>
                  <Box sx={{ padding: 1 }}>
                    <IconButton
                      sx={{
                        color: "white",
                        "&:hover": { color: "#ffd700" },
                      }}
                      onClick={() => {
                        setSelectedChallenge(card);
                        setEditModalOpen(true);
                      }}
                    >
                      <EditNoteIcon sx={{ fontSize: "35px" }} />
                    </IconButton>
                    <IconButton
                      sx={{
                        color: "green",
                        "&:hover": { color: "#ffd700" },
                      }}
                      onClick={() => {
                        setSelectedChallenge(card);
                        setWriteModalOpen(true);
                      }}
                    >
                      <BorderColorIcon />
                    </IconButton>
                  </Box>
                </Box>
              )}
            </Box>
          </Card>
          
        </Grid>
      ))}
      <ChallengeQuestionModal
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            challenge={selectedChallenge}
          />
      <ChallengeQuestionStarterModal
            open={writeModalOpen}
            onClose={() => setWriteModalOpen(false)}
            challenge={selectedChallenge}
          />
    </Grid>
  );
}
