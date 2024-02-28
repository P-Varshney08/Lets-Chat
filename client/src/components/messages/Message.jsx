import React from 'react'

function Message() {
  return (
    <div className='chat chat-end'>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Chat Message" />
            </div>
        </div>
        <div className={`chat-bubble text-white bg-slate-400`}>Hii! Whats up
        </div>
        <div className={`chat-footer opacity-50 text-xs flex gap-1 items-center text-black font-bold`}>12:42</div>
    </div>
  )
}

export default Message