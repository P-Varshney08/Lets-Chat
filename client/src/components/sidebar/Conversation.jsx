import React from 'react'
import useConversation from '../../zustand/useConversation';

function Conversation({convo, lastIdx}) {
  const {selectedConversation, setSelectedConversation} = useConversation();

  const isSelected = selectedConversation && selectedConversation.id === convo.id;
  return (
    <>
        <div className={`flex gap-2 items-center hover:bg-yellow-400 rounded p-2 py-1 cursor-pointer
            ${isSelected ? "bg-sky-500" : ""}
        `}
            onClick={()  => setSelectedConversation(convo)}
        >
            <div className="avatar online">
                <div className="w-12 rounded-full">
                    <img src={convo.profilePicture} alt="user image" />
                </div>
            </div>
            <div className="flex flex-col flex-1">
                <div className="flex gap-3 justify-between">
                    <p className='font-bold text-black'>{convo.username}</p>
                    {/* <span className='text-xl'>❤️</span> */}
                </div>
            </div>
        </div>
        {!lastIdx && <div className='divider my-0 py-0 h-1' />}
    </>
  )
}

export default Conversation;