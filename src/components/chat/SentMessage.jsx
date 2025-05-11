import { Avatar, Box, Paper, Typography } from '@mui/material'

const SentMessage = ({ message }) => {

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Paper sx={{ bgcolor: 'rgba(196, 61, 55, 0.8)', px: 2, py: 1, borderRadius: 4 }}>
        <Typography color="white" fontWeight="bold">{message}</Typography>
      </Paper>
      <Avatar />
    </Box>
  )
}

export default SentMessage
