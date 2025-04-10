import React from 'react'
import { Avatar, Box, Card, CardContent, Chip, Typography } from '@mui/material';

const Post = ({ posts, nickname }) => {
  return (
    <Box sx={{ mt: 2 }}>
            {posts.map((post, index) => (
              <Card key={index} sx={{ backgroundColor: 'rgba(128,0,0,0.7)', color: 'white', mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar />
                    <Typography variant="h6">{nickname}</Typography>
                    <Chip label={post.category} sx={{ ml: 'auto', backgroundColor: '#800000', color: 'white' }} />
                  </Box>
                  <Typography variant="body2" sx={{ mt: 1 }}>{post.content}</Typography>
                  <Chip label={post.tags} sx={{ mt: 1, backgroundColor: '#666', color: 'white' }} />
                </CardContent>
              </Card>
            ))}
          </Box>
  )
}

export default Post
