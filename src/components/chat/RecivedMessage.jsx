import { Avatar, Box, Paper, Typography } from "@mui/material"


const RecivedMessage = ({ message }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Avatar />
      <Paper sx={{ bgcolor: 'rgba(196, 61, 55, 0.8)', px: 2, py: 1, borderRadius: 4 }}>
        <Typography color="white" fontWeight="bold">{message}</Typography>
      </Paper>
    </Box>
  )
}

export default RecivedMessage
