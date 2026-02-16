import ConversationHeader from '@/Components/App/ConversationHeader';
import MessageItem from '@/Components/App/MessageItem';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ChatLayout from '@/Layouts/ChatLayout';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import { useEffect, useRef, useState } from 'react';

function Home({ selectedConversation = null, messages = null,  }) {
    const [localMessages, setLocalMessages] = useState([]);
    const messagesCtrRef = useRef(null);

    useEffect(() => {
        setLocalMessages(messages);
    }, [messages]);

    return (
        <>
            {!messages && (
                <div className="flex flex-col gap-8 text-center opacity-35 items-center justify-center h-full">
                    <div className="text-gray-500 text-2xl md:text-4xl p-16 text-slate-200">Select a conversation to start chatting</div>
                    <ChatBubbleLeftRightIcon className="w-32 h-32 inline-block" />
                </div>
            )}
            {
                messages && (<>
                    <ConversationHeader selectedConversation={selectedConversation} />
                    <div ref={messagesCtrRef} className='flex-1 overflow-y-auto p-5'>
                        {/* Messages */}
                        {localMessages.length === 0 && (
                            <div className="flex flex-col flex ">
                                {localMessages.map((message) => (
                                    <MessageItem key={message.id} message={message} />
                                ))}
                            </div>)}
                    </div>
                    {/* <MessageInput conversation={selectedConversation} /> */}
                </>)
            }
        </>
    );
}

Home.layout = (page) => {
    return (
        <AuthenticatedLayout user={page.props.auth.user}>
            <ChatLayout children={page} />
        </AuthenticatedLayout>
    );
}

export default Home;