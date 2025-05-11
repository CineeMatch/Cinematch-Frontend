import { Box, Typography, Avatar, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SentMessage from '../components/chat/SentMessage.jsx';
import RecivedMessage from '../components/chat/RecivedMessage.jsx';
import ChatList from '../components/chat/ChatList.jsx';
import { useSocket } from '../components/hooks/useSocket.js';
import { useEffect, useState } from 'react';

const ChatPage = () => {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); // Tüm gelen/giden mesajlar
  const [selectedUser, setSelectedUser] = useState(null); // Tıklanan kişi
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (msg) => {
      setMessages((prev) => [...prev, { ...msg, isOwn: false }]);
    };

    socket.on("receiveMessage", handleMessage);

    return () => {
      socket.off("receiveMessage", handleMessage);
    };
  }, [socket]);

  const sendMessage = (text) => {
    if (!selectedUser || !text) return;

    console.log("Mesaj gönderildi:", text);

    const msg = {
      from: "Abdullah",
      to: selectedUser.name,
      text,
      isOwn: true
    };

    socket.emit("sendMessage", msg);
    setMessages((prev) => [...prev, msg]);
    setMessage("");
  };

  // ✅ return kısmı artık en sonda, hook'lardan sonra geliyor
  if (!isConnected || !socket) {
    return <div>Bağlanıyor...</div>;
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        backgroundImage: "url('/images/movie-background.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
      }}
    >
      {/* SOL PANEL */}
      <ChatList onSelectUser={setSelectedUser} selectedUser={selectedUser} />


      {/* SAĞ PANEL */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          p: 2,
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
            width: '500',
          }}
        >
          <Avatar />
          <Typography variant="h6" fontWeight="bold">{ selectedUser.name }</Typography>
        </Box>
        </Box>

        {/* MESAJLAR */}
        <Box sx={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {messages.map((msg, i) =>
            msg.isOwn ? (
              <SentMessage key={i} message={msg.text} />
            ) : (
              <RecivedMessage key={i} message={msg.text} />
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
            mt: 2,
          }}
        >
          <TextField
            placeholder="Write a message"
            variant="standard"
            fullWidth
            InputProps={{
              disableUnderline: true,
              sx: { color: 'white', pl: 2 },
            }}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <IconButton onClick={() => {
            sendMessage(message);
            setMessage("");
            console.log("button calisiyor:", message);
            }
          }>
            <SendIcon sx={{ color: 'white' }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPage;
