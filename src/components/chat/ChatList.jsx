import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { getCurrentUserFriendsList } from '../../api/profile/friends'

const ChatList = ({ onSelectUser, selectedUser }) => {

  const [friends, setFriends] = useState([])

  useEffect(() => {
  
      const fetchFriends = async () => {
        try {
          const response = await getCurrentUserFriendsList();
          console.log("2.",response);
          setFriends(response);
        } catch (error) {
          console.error('Error fetching friends:', error);
        }
      };
      fetchFriends();
    }
    , []);

  
  const userData = [
    {
      id: 1,
      name: 'Dreath',
      avatar: '/images/avatar.png',
    },
    {
      id: 2,
      name: 'John Doe',
      avatar: '/images/avatar.png',
    },
    {
      id: 3,
      name: 'Jane Smith',
      avatar: '/images/avatar.png',
    },
    {
      id: 4,
      name: 'Alice Johnson',
      avatar: '/images/avatar.png',
    },
    {
      id: 5,
      name: 'Bob Brown',
      avatar: '/images/avatar.png',
    },
    {
      id: 6,
      name: 'Charlie Davis',
      avatar: '/images/avatar.png',
    },
    {
      id: 7,
      name: 'David Wilson',
      avatar: '/images/avatar.png',
    },
    {
      id: 8,
      name: 'Eva Green',
      avatar: '/images/avatar.png',
    },
    {
      id: 9,
      name: 'Frank White',
      avatar: '/images/avatar.png',
    },
    {
      id: 10,
      name: 'Grace Lee',
      avatar: '/images/avatar.png',
    },
  ]

  return (
    <Box
        sx={{
          width: 300,
          bgcolor: 'rgba(0,0,0,0.85)',
          overflowY: 'auto',
          p: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Messages
        </Typography>
        <List>
          {friends.map((user, index) => {

            const isSelected = selectedUser?.name === user.name;

            return (
              <ListItem
                button
                key={index}
                onClick={() => onSelectUser(user)} // tıklanılan kullanıcıyı yukarı aktar
                selected={isSelected}
                sx={{
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  bgcolor: isSelected ? 'rgba(255,255,255,0.1)' : 'transparent',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.15)',
                  }
                }}
              >
                <ListItemAvatar><Avatar src={user.avatar} /></ListItemAvatar>
                <ListItemText primaryTypographyProps={{ color: 'white' }}>{user.name}</ListItemText>
              </ListItem>
            )
          })}
        </List> 
      </Box>
  )
}

export default ChatList
