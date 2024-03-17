import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";

function Messages() {
    const { loading, messages } = useGetMessages();
    // const messages_str = JSON.stringify(messages);
    const lastMsgRef = useRef(null); // useRef is used to have focus on the new message when it's added or we can say neeche last msg pr scrolled hoga
    console.table(messages);
    useEffect(() => {
        setTimeout(() => {
            lastMsgRef.current?.scrollIntoView({ behaviour: "smooth" });
        }, 100);
    }, [messages]);
    return (
        <div className="px-4 flex-1 overflow-auto">
            {!loading &&
                messages.length > 0 &&
                messages.map((message) => (
                    <Message key={message.id} message={message} />
                    // <div key={message.id}>
                    //     <Message ref = {lastMsgRef} message={message}/>
                    // </div>
                ))}

            {loading &&
                [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
            {!loading && messages.length === 0 && (
                <p className="text-center">
                    Send a message to start a conversation
                </p>
            )}
            <div ref={lastMsgRef} />
        </div>
    );
}

export default Messages;
