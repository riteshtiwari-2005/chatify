import React from 'react';
import { useAuth } from '../../context/AuthProvider';

const Message = ({ message }) => {
    const [authUser] = useAuth();
    const itsMe = message.senderId === authUser.user._id;

    const chatName = itsMe ? "chat-end" : "chat-start";

    const createdAt = new Date(message.createdAt);
    const formattedTime = createdAt.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    })
    return (
        <div>
            <div className="px-4 py-1">
                <div className={`chat ${chatName}`}>
                    <div className={`max-w-[min(75%,32rem)] whitespace-pre-line rounded-lg px-3 py-2 text-sm shadow-sm ${itsMe ? "rounded-tr-none bg-[#d9fdd3] text-slate-800" : "rounded-tl-none bg-white text-slate-800"}`}>{message.message}
                        <span className="ml-3 whitespace-nowrap text-[10px] text-slate-500">{formattedTime}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Message;
