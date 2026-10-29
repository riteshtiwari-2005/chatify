import React from 'react'
import useConversation from '../../zustand/useConversation';
import { useSocketContext } from '../../context/SocketContext';
import { CiMenuFries } from 'react-icons/ci';

const Chatuser = () => {

  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline"
  }

  return (
    <>
      <div className="relative flex h-[9vh] items-center gap-3 border-b border-[#d1d7db] bg-[#f0f2f5] px-4 shadow-sm duration-300">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button absolute left-1 lg:hidden"
        >
          <CiMenuFries className="text-white text-xl" />
        </label>
        <div className="ml-8 flex items-center gap-3 py-2">
          <div className={`avatar ${getOnlineUsersStatus(selectedConversation._id) === "Online" ? "online" : "offline"}`}>
            <div className="w-11 rounded-full ring-2 ring-white">
              <img src="/assets/logo.avif" alt="" />
            </div>
          </div>
          <div>
            <h1 className="font-semibold text-slate-800">{selectedConversation ? selectedConversation.fullname : "K AMITH"}</h1>
            <span className={`text-xs ${getOnlineUsersStatus(selectedConversation._id) === "Online" ? "text-[#128c7e]" : "text-slate-500"}`}>{getOnlineUsersStatus(selectedConversation._id)}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chatuser
