import { TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useSocket } from './hooks/useSocket.js';

const ChatDeneme = () => {
  const [message, setMessage] = useState("");
  const { socket, isConnected } = useSocket();

  if (!isConnected || !socket) return <div>Bağlanıyor...</div>;


  const sendMessage = (text) => {
    socket.emit("sendMessage", {
      from: "Abdullah",
      to: "Sena",
      text
    });
  };

  return (
    <div>
      <TextField
        label="Mesaj yaz"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        onClick={() => {
          sendMessage(message);
          setMessage("");
        }}
      >
        Gönder
      </Button>
    </div>
  );
};

export default ChatDeneme;
