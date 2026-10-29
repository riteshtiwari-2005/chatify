import React from 'react'
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from '../../context/SocketContext';

const User = ({ user }) => {

    const { selectedConversation, setSelectedConversation } = useConversation();
    const isSelected = selectedConversation?._id === user._id;

    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(user._id);

    return (
        <div className={`duration-300 ${isSelected ? "bg-[#e9edef]" : "bg-white hover:bg-[#f5f6f6]"}`} onClick={() => setSelectedConversation(user)}>
            <div className="flex cursor-pointer items-center space-x-4 border-b border-slate-100 px-7 py-5">
                <div className={`avatar ${isOnline ? "online" : ""}`}>
                    <div className="w-12 rounded-full bg-white p-1">
                        <img src="/assets/logo.avif" alt="" className="rounded-full object-cover" />
                    </div>
                </div>
                <div className="min-w-0">
                    <h1 className="truncate text-lg font-bold text-[#334155]">{user.fullname}</h1>
                    <span className="block truncate text-sm text-[#718096]">{user.email}</span>
                </div>
            </div>
        </div>
    )
}

export default User
