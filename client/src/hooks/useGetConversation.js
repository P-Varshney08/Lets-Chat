import axios from 'axios';
import React, { useEffect, useState } from 'react'

const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async() => {
        setLoading(true);
        try {
            const res = await axios.get('/api/user');
            // console.log(`useGetConv m res aaya h ->   ${res.data}`);
            const data = res.data;
            if(data.error) {
                throw new Error(data.error);
            }
            setConversations(data);
        } catch (error) {
            toast.error(error.message);
        }
    }
    getConversations();
  }, []);

  return { conversations, loading };
}

export default useGetConversation