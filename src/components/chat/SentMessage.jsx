import { Avatar, Box, Paper, Typography } from '@mui/material'

const SentMessage = ({ message, avatar_url }) => {

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mr: 2}}>
      <Paper sx={{ bgcolor: 'rgba(196, 61, 55, 0.8)', px: 2, py: 1, borderRadius: 4, mr: 1, maxWidth: '70%' }}>
        <Typography color="white" fontWeight="bold">{message}</Typography>
      </Paper>
      <Avatar src={avatar_url} />
    </Box>
  )
}

export default SentMessage
