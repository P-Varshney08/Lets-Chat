import React, { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';
import axios from 'axios';

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const {messages, setMessages, selectedConversation} = useConversation();

  useEffect(() => {
    // console.log("useGetMessages hook - selectedConversation:", selectedConversation);
    // console.log("useGetMessages hook - messages:", messages);
    const getMessages = async() => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/messages/${selectedConversation.id}`);
            const data = res.data;
            if(data.error) {
                throw new Error(data.error);
            }
            setMessages(data);
        } catch (error) {
            toast.error(error.message);
        } finally{
            setLoading(false);
        }
    }
    if(selectedConversation?.id) getMessages()
  }, [selectedConversation?.id, setMessages])
  return { messages, loading };
}

export default useGetMessages