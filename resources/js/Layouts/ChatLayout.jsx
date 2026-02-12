import { usePage } from "@inertiajs/react";
import { useEffect } from 'react';

const ChatLayout = ({ children }) => {
    const page = usePage();
    const conversations = page.props.conversations;
    const selectedConversation = page.props.selectedConversation;

    useEffect(() => {
        const echo = window.Echo;
        if (!echo) {
            console.warn('Echo not initialized');
            return;
        }

        const channel = echo.join('Online')
            .here((users) => { console.log('Users currently online:', users); })
            .joining((user) => { console.log('User joined:', user); })
            .leaving((user) => { console.log('User left:', user); })
            .error((error) => { console.error('Error joining channel:', error); });

        return () => {
            if (channel && typeof channel.leave === 'function') {
                channel.leave();
            }
        };
    }, []);

    return (
        <>
            ChatLayout
            <div>{children}</div>
        </>
    );
}

export default ChatLayout;