import React from 'react'
import { Avatar, Box, Card, CardContent, Chip, Typography } from '@mui/material';

const Post = ({ index, nickname, category, content, tags}) => {
  return (
              <Card key={index} sx={{ backgroundColor: 'rgba(128,0,0,0.7)', color: 'white', mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar />
                    <Typography variant="h6">{nickname}</Typography>
                    <Chip label={category} sx={{ ml: 'auto', backgroundColor: '#800000', color: 'white' }} />
                  </Box>
                  <Typography variant="body2" sx={{ mt: 1 }}>{content}</Typography>
                  <Chip label={tags} sx={{ mt: 1, backgroundColor: '#666', color: 'white' }} />
                </CardContent>
              </Card>
  )
}

export default Post
