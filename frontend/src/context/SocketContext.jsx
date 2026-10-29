import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import io from "socket.io-client";

const socketContext = createContext();

export const useSocketContext = () => {
    return useContext(socketContext);
}

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [authUser] = useAuth();

    useEffect(() => {
        if (authUser) {
            const socketUrl = import.meta.env.VITE_SOCKET_URL ||
                (window.location.hostname === "localhost"
                    ? "http://localhost:5000"
                    : "https://a-chat-amith.onrender.com");
            const socket = io(socketUrl, {
                query: {
                    userId: authUser.user._id,
                },
                withCredentials: true,
            });
            setSocket(socket);
            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });
            socket.on("connect_error", (error) => {
                console.error("Socket connection error:", error.message);
            });
            return () => {
                socket.removeAllListeners();
                socket.close();
                setSocket(null);
                setOnlineUsers([]);
            };
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return (
        <socketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </socketContext.Provider>
    )
}