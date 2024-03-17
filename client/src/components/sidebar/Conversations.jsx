import React from 'react'
import Conversation from './Conversation'
import useGetConversation from '../../hooks/useGetConversation.js';

function Conversations() {
  const {loading, conversations} = useGetConversation();
  const conversations_str = JSON.stringify(conversations);
  // console.log(`Conversations are: ${conversations_str}`)
  // console.log(`Conversations are: ${conversations}`)
  return (
    <div className='py-2 flex flex-col overflow-auto'>
        {/* {conversations.map((convo, idx)=> (
          <Conversation
            key={convo.id}
            lastIdx={idx === convo.length -1}    // for last conversation we dont need divider thats why
           />
        ))} */}
        {conversations.map((conversation, idx) => (
        //   <div key={idx} className='conversation'>
        //   <p>Conversation {idx + 1}</p>
        //   <p>Participant: {conversation.username}</p>
        // </div>
        <Conversation key={conversation.id} lastIdx={idx==conversations.length-1} convo={conversation}/>
        ))}
        {loading ? <span className='loading loading-spinner mx-auto'></span> : null }
    
    </div>
  )
}

export default Conversations;