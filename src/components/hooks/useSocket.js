import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

export const useSocket = () => {
    const socket = useRef(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        socket.current = io(SOCKET_URL);

        socket.current.on("connect", () => {
            setIsConnected(true);
            console.log("Socket bağlandı:", socket.current.id);
        });

        return () => {
            socket.current.disconnect();
            setIsConnected(false);
        };
    }, []);

    return { socket: socket.current, isConnected };
};
