import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation';

function Message({message}) {
  console.log("message is: ", message)
  const {authUser} = useAuthContext();
  // console.log(`authUser is : ${JSON.stringify(authUser)}`);
  const {selectedConversation} = useConversation();
  // console.log(`selectedConversation is: ${JSON.stringify(selectedConversation)}`)
  const fromMe = message.senderId === authUser.userId;
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const profilePic = fromMe ? authUser.profilePic: selectedConversation?.profilePicture;
  const bubbleBgColor = fromMe ? 'bg-blue-500': "";
  const formattedTime = extractTime(message.createdAt);
  return (
    <div className={`chat ${chatClassName}`}>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img 
                  // src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  src={profilePic}
                  alt="Chat Message"
                />
            </div>
        </div>
        <div className={`chat-bubble text-white  ${bubbleBgColor} pb-2`}> {message.message} </div>
        <div className={`chat-footer opacity-50 text-xs flex gap-1 items-center text-black font-bold`}>{formattedTime}</div>
    </div>
  )
}

export default Message

function extractTime(dateString) {
  const date = new Date(dateString);
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  return `${hours}:${minutes}`;
}

function padZero(number) {
  return number.toString().padStart(2, "0");
}