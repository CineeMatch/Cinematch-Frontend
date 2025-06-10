import { Avatar, Box, Paper, Typography } from "@mui/material"


const RecivedMessage = ({ message }) => {
  return (
    <Box sx={{ display: 'flex', ml: 2 }}>
      <Avatar />
      <Paper sx={{ bgcolor: 'rgba(196, 61, 55, 0.8)', px: 2, py: 1, borderRadius: 4, ml: 1, maxWidth: '70%' }}>
        <Typography color="white" fontWeight="bold">{message}</Typography>
      </Paper>
    </Box>
  )
}

export default RecivedMessage
