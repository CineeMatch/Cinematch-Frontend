import { Box } from "@mui/material";
// import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import ChallangeCard from "./ChallengeCard.jsx";

export default function ActiveChallangeModal() {
  // const navigate = useNavigate();

  return (
    
    <Box
    sx={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5)),
                        url(/images/main-Photoroom.png)`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "100vh",
      width: "100vw",
      backgroundSize: "cover",
      backgroundPosition: "center",
      padding: 4,
      boxSizing: "border-box",
      marginTop: "50px",
    }}
  >
    <Typography
      variant="h4"
      sx={{
        fontWeight: "bold",
        fontFamily: "'Cinzel', serif",
        color: "#d4caa5",
        textTransform: "uppercase",
        textShadow: `
          0 0 10px rgba(249, 246, 237, 0.7),
          0 0 15px rgba(244, 242, 235, 0.6)
        `,
        mb: 3,
      }}
      align="center"
    >
      Aktif Film Kapışmaları
    </Typography>

    <Box
      sx={{
        width: "100%",
        maxWidth: "1200px",
        overflowY: "auto",
        flexGrow: 1,
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <ChallangeCard />
    </Box>
  </Box>
  );
}
