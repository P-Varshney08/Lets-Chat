import React, { useState } from 'react'
import { MdOutlineSend } from "react-icons/md";
import useSendMessage from '../../hooks/useSendMessage';

function MessagesInput() {
  const {loading, sendMessage} = useSendMessage();
  const [message, setMessage] = useState("");
  const handleSendMessage = async(e) => {
    e.preventDefault();
    // console.log(`message typed is this: ->  ${message}`)
    if(!message) return;
    await sendMessage(message);
    setMessage("")
  }
  return (
    <form className='px-4 my-3' onSubmit={handleSendMessage}>
        <div className='w-full relative'>
            <input 
                type="text" 
                className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white'
                placeholder='Send a message'
                value={message}
                onChange={(e)=>setMessage(e.target.value)}
            />
            <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
                
                {loading ? <div className='loading loading-spinner'></div> : <MdOutlineSend />}
            </button>
        </div>        
    </form>
  )
}

export default MessagesInput