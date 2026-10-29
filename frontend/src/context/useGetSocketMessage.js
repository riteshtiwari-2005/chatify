
import { useEffect } from 'react';
import { useSocketContext } from './SocketContext';
import useConversation from '../zustand/useConversation';
import { useAuth } from './AuthProvider';

const useGetSocketMessage = () => {
    const { socket } = useSocketContext();
    const { selectedConversation, addMessage } = useConversation();
    const [authUser] = useAuth();

    useEffect(() => {
        if (!socket || !selectedConversation || !authUser?.user?._id) return;

        const handleNewMessage = (newMessage) => {
            const isCurrentConversation =
                newMessage.senderId === selectedConversation._id ||
                newMessage.receiverId === selectedConversation._id;

            if (!isCurrentConversation || newMessage.receiverId !== authUser.user._id) {
                return;
            }

            const notification = new Audio(
                '/assets/a-chat-notification.wav'
            );

            notification.play().catch((error) => {
                console.log('Notification sound could not play:', error);
            });

            addMessage(newMessage);
        };

        socket.on('newMessage', handleNewMessage);

        return () => {
            socket.off('newMessage', handleNewMessage);
        };
    }, [socket, selectedConversation, authUser, addMessage]);
};

export default useGetSocketMessage;
