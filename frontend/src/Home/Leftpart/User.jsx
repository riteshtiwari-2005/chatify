import React from 'react'
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from '../../context/SocketContext';

const User = ({ user }) => {

    const { selectedConversation, setSelectedConversation } = useConversation();
    const isSelected = selectedConversation?._id === user._id;

    const { socket, onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(user._id);

    return (
        <div className={`duration-300 ${isSelected ? "bg-[#e9edef]" : "hover:bg-[#f5f6f6]"}`} onClick={() => setSelectedConversation(user)}>
            <div className="flex cursor-pointer space-x-3 border-b border-slate-100 px-5 py-3">
                <div className={`avatar ${isOnline? "online" : ""}`}>
                    <div className="w-12 rounded-full">
                        <img src="/assets/logo.avif" />
                    </div>
                </div>
                <div className="min-w-0">
                    <h1 className="truncate font-semibold text-slate-700">{user.fullname}</h1>
                    <span className="block truncate text-xs text-slate-500">{user.email}</span>
                </div>
            </div>
        </div>
    )
}

export default User
