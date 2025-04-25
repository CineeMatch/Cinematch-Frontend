import React from 'react'
import { Box, Button,  Grid, Typography } from '@mui/material';

const Stat = ({ level, lastActivity, badge, friends, watched, wishlist, activeChallenges }) => {
  return (
    <Grid item xs={12} md={4}>
          <Box sx={{ p: 3, backgroundColor: 'rgba(128,0,0,0.7)', borderRadius: 2, height: '100%', textAlign: 'center' }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              LEVEL <Box sx={{ backgroundColor: 'white', color: 'black', borderRadius: '50%', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', ml: 1 }}>{level}</Box>
            </Typography>
            <Typography variant="subtitle2" sx={{ mt: 1 }}>LAST ACTIVITY: {lastActivity}</Typography>
            <Button variant="contained" sx={{ mt: 2, backgroundColor: '#800000', width: '100%' }}>Edit Profile</Button>
            <Typography variant="h6" sx={{ mt: 3 }}>Badges {badge}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 1 }}>
              {[...Array(5)].map((_, index) => (
                <Box key={index} sx={{ width: 40, height: 40, backgroundColor: '#999', borderRadius: 1 }} />
              ))}
            </Box>
            <Box sx={{ mt: 3, textAlign: 'left', pl: 2 }}>
              <Typography variant="body1">Friends<span style={{ float: 'right', marginRight: '10px' }}>{friends}</span></Typography>
              <Typography variant="body1">Watched<span style={{ float: 'right', marginRight: '10px' }}>{watched}</span></Typography>
              <Typography variant="body1">Wish List<span style={{ float: 'right', marginRight: '10px' }}>{wishlist}</span></Typography>
              <Typography variant="body1">Active Challanges<span style={{ float: 'right', marginRight: '10px' }}>{activeChallenges}</span></Typography>
            </Box>
          </Box>
        </Grid>
  )
}

export default Stat
