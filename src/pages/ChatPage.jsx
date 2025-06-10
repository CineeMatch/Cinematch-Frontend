import { Box, Typography, Avatar, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SentMessage from '../components/chat/SentMessage.jsx';
import RecivedMessage from '../components/chat/RecivedMessage.jsx';
import ChatList from '../components/chat/ChatList.jsx';
import { useSocket } from '../components/hooks/useSocket.js';
import { useEffect, useState } from 'react';
import { getActiveUser } from '../api/profile/user.js'; // Aktif kullanıcı bilgilerini almak için API çağrısı

const ChatPage = () => {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); // Tüm gelen/giden mesajlar
  const [selectedUser, setSelectedUser] = useState("Abdullah"); // Tıklanan kişi
  const { socket, isConnected } = useSocket();
  const [activeUserId, setActiveUserId] = useState();

  useEffect(() => {
    
    const fetchActiveUser = async () => {
      try {
        const response = await getActiveUser();
        setActiveUserId(response.id);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };
    fetchActiveUser();
  }
  , [activeUserId]);

  useEffect(() => {
    if (!socket || !selectedUser || !activeUserId) return;
  
    const chatRoom = [activeUserId, selectedUser.id].sort().join("_");
    socket.emit('joinChat', { user1: activeUserId, user2: selectedUser.id });
  
    console.log("Join edilen oda:", chatRoom);
  }, [socket, selectedUser, activeUserId]);

  useEffect(() => {
    if (!socket || !activeUserId) return;
  
    const handleMessage = (msg) => {
      if (msg.from === activeUserId) return; // kendi mesajınsa ekleme!
      setMessages((prev) => [...prev, { ...msg, isOwn: false }]);
    };
  
    socket.on("receiveMessage", handleMessage);
  
    return () => {
      socket.off("receiveMessage", handleMessage);
    };
  }, [socket, activeUserId]);
  

  const sendMessage = (text) => {
    if (!selectedUser || !text) return;

    console.log(selectedUser.id, "id'si ile mesaj gönderiliyor:", text);
    console.log("Aktif kullanıcı id'si:", activeUserId);
  
    const msg = {
      from: activeUserId,          // kullanıcı id’si
      to: selectedUser.id,          // karşı tarafın id’si
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

  console.log(selectedUser.id)

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
