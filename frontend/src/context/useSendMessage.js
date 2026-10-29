import React, { useState } from "react";
import useConversation from "../zustand/useConversation.js";
import axios from "axios";
const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();
  const sendMessages = async (message, coordinates) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `/api/message/send/${selectedConversation._id}`,
        { message, ...coordinates }
      );
      setMessage([...messages, res.data]);
      setLoading(false);
      return true;
    } catch (error) {
      console.log("Error in send messages", error);
      setLoading(false);
      return false;
    }
  };
  return { loading, sendMessages };
};

export default useSendMessage;