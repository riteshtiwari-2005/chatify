import React, { useEffect } from 'react'
import Chatuser from './Chatuser'
import Messages from './Messages'
import Typesend from './Typesend'
import useConversation from '../../zustand/useConversation'
import { useAuth } from '../../context/AuthProvider'
import { CiMenuFries } from "react-icons/ci";

const Right = () => {

  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation])

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#efeae2] text-slate-700">
      <div>
        {!selectedConversation ? (<NoChatSelected />) : (
          <>
            <Chatuser />
            <div className="flex-1 overflow-y-auto bg-chat-pattern" style={{ maxHeight: "calc(100vh - 9vh)" }}>
              <Messages />
            </div>
            <Typesend />
          </>
        )}
      </div>
    </div>
  )
}

export default Right


const NoChatSelected = () => {
  const [authUser] = useAuth();
  return (
    <>
      <div className="relative flex min-h-screen items-center justify-center bg-[#f0f2f5]">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden absolute left-5"
        >
          <CiMenuFries className="text-white text-2xl" />
        </label>
        <div className="max-w-lg px-6 text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#d9fdd3] text-4xl shadow-sm">💬</div>
          <h1 className="text-lg text-slate-500">Welcome <span className="font-semibold text-[#128c7e]">{authUser.user.fullname}</span>
            <br />
            No chat selected. Choose a contact to start a conversation.
          </h1>
        </div>
      </div>
    </>
  )
}