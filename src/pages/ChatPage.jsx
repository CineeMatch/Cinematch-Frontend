/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Typography, Avatar, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SentMessage from '../components/chat/SentMessage.jsx';
import ReceivedMessage from '../components/chat/ReceivedMessage.jsx';
import ChatList from '../components/chat/ChatList.jsx';
import { useSocket } from '../components/hooks/useSocket.js';
import { useEffect, useRef, useState } from 'react';
import { getActiveUser } from '../api/profile/user.js';
import { getChatMessages } from '../api/chat/chat.js';

const ChatPage = () => {
  const { socket } = useSocket();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [offset, setOffset] = useState(0);
  const messageContainerRef = useRef(null);
  const messageLimit = 20;
  const [activeUserId, setActiveUserId] = useState();
  const [activeUserAvatar, setActiveUserAvatar] = useState();
  const [selectedUserAvatar, setSelectedUserAvatar] = useState();

  const scrollToBottom = () => {
    const container = messageContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  const sendMessage = (text) => {
    if (!selectedUser || !text) return;

    const msg = {
      from: activeUserId,
      to: selectedUser.id,
      text,
      isOwn: true
    };

    socket.emit('sendMessage', msg);
    setMessages((prev) => [...prev, msg]);
    setMessage('');
  };

  const handleScroll = async () => {
    const container = messageContainerRef.current;
    if (container.scrollTop === 0) {
      try {
        const newOffset = offset + messageLimit;
        const chatRoom = [activeUserId, selectedUser.id].sort().join('_');
        const res = await getChatMessages(chatRoom, messageLimit, newOffset);
        const parsed = res.map((msg) => ({
          ...msg,
          isOwn: msg.sender_id === activeUserId
        }));
        setMessages((prev) => [...parsed, ...prev]);
        setOffset(newOffset);
      } catch (err) {
        console.error('Eski mesajlar alınamadı:', err);
      }
    }
  };

  // Aktif kullanıcıyı al
  useEffect(() => {
    const fetchActiveUser = async () => {
      try {
        const response = await getActiveUser();
        setActiveUserAvatar(response.profile_image_url);
        setActiveUserId(response.id);
      } catch (error) {
        console.error('Error fetching active user:', error);
      }
    };
    fetchActiveUser();
  }, []);

  // Socket bağlantısı kontrolü
  useEffect(() => {
    if (!socket || !selectedUser || !activeUserId) return;
    // const chatRoom = [activeUserId, selectedUser.id].sort().join('_');
    socket.emit('joinChat', { user1: activeUserId, user2: selectedUser.id });
  }, [socket, selectedUser, activeUserId]);

  // Yeni mesaj geldiğinde güncelle
  useEffect(() => {
    if (!socket || !activeUserId) return;

    const handleMessage = (msg) => {
      if (msg.from === activeUserId) return;
      setMessages((prev) => [...prev, { ...msg, isOwn: false }]);
    };

    socket.on('receiveMessage', handleMessage);
    return () => socket.off('receiveMessage', handleMessage);
  }, [socket, activeUserId]);

  // Seçilen kullanıcı değiştiğinde mesajları al
  useEffect(() => {
    if (!selectedUser || !activeUserId) return;

    const chatRoom = [activeUserId, selectedUser.id].sort().join('_');

    const fetchMessages = async () => {
      try {
        const res = await getChatMessages(chatRoom);
        const parsed = res.map((msg) => ({
          ...msg,
          isOwn: msg.sender_id === activeUserId
        }));
        setMessages(parsed);
        setOffset(0);
      } catch (err) {
        console.error('Mesajlar alınamadı:', err);
      }
    };

    setSelectedUserAvatar(selectedUser.profile_image_url);
    fetchMessages();
  }, [selectedUser, activeUserId]);

  // Seçilen kullanıcı değiştiğinde avatar'ı güncelle
  useEffect(() => {
    const container = messageContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [offset, selectedUser]);

  // 🔽 Yeni mesaj geldiğinde scroll'u en aşağıya kaydır
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        backgroundImage: "url('/images/movie-background.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white'
      }}
    >
      {/* SOL PANEL */}
      <ChatList onSelectUser={setSelectedUser} selectedUser={selectedUser} />

      {/* SAĞ PANEL */}
      {selectedUser && selectedUser !== 'Abdullah' ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            p: 2
          }}
        >
          {/* ÜST BAR */}
          <Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                bgcolor: 'rgba(0,0,0,0.7)',
                p: 2,
                borderRadius: 2,
                mb: 3,
                width: '500'
              }}
            >
              <Avatar src={selectedUser.profile_image_url} />
              <Typography variant="h6" fontWeight="bold">
                {selectedUser.name}
              </Typography>
            </Box>
          </Box>

          {/* MESAJLAR */}
          <Box
            ref={messageContainerRef}
            sx={{
              flex: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}
          >
            {messages.map((msg, i) =>
              msg.isOwn ? (
                <SentMessage key={i} message={msg.text || msg.content} avatar_url={activeUserAvatar}/>
              ) : (
                <ReceivedMessage key={i} message={msg.text || msg.content} avatar_url={selectedUserAvatar} />
              )
            )}
          </Box>

          {/* MESAJ GİRİŞİ */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              bgcolor: 'rgba(196, 61, 55, 0.9)',
              borderRadius: 10,
              p: 1,
              mt: 2
            }}
          >
            <TextField
              placeholder="Write a message"
              variant="standard"
              fullWidth
              InputProps={{
                disableUnderline: true,
                sx: { color: 'white', pl: 2 }
              }}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <IconButton
              onClick={() => {
                sendMessage(message);
              }}
            >
              <SendIcon sx={{ color: 'white' }} />
            </IconButton>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'rgba(0,0,0,0.6)',
            borderRadius: 4,
            m: 4
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="white">
            Birazcık Sosyalleşmenin Tam Zamanı!
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ChatPage;
