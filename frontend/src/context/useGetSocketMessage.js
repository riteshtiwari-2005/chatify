
import { useEffect } from 'react';
import { useSocketContext } from './SocketContext';
import useConversation from '../zustand/useConversation';

const useGetSocketMessage = () => {
    const { socket } = useSocketContext();
    const { messages, setMessage } = useConversation();

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (newMessage) => {
            const notification = new Audio(
                '/assets/a-chat-notification.wav'
            );

            notification.play().catch((error) => {
                console.log('Notification sound could not play:', error);
            });

            setMessage([...messages, newMessage]);
        };

        socket.on('newMessage', handleNewMessage);

        return () => {
            socket.off('newMessage', handleNewMessage);
        };
    }, [socket, messages, setMessage]);
};

export default useGetSocketMessage;
