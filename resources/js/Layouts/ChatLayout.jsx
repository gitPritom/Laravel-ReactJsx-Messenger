import { usePage } from "@inertiajs/react";
import { use, useEffect, useState } from 'react';

const ChatLayout = ({ children }) => {
    const page = usePage();
    const conversations = page.props.conversations;
    const selectedConversation = page.props.selectedConversation;
    const [localConversations, setLocalConversations] = useState([]);
    const [sortedConversations, setSortedConversations] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);

    const isUserOnline = (userId) => onlineUsers[userId];

    console.log("Conversations in ChatLayout:", conversations);
    console.log("Selected Conversation in ChatLayout:", selectedConversation);

    useEffect(() => {
        setLocalConversations(
            localConversations.sort((a, b) => {
                if (a.blocked_at && b.blocked_at) { return a.blocked_at > b.blocked_at ? -1 : 1; }
                else if (a.blocked_at) { return 1; }
                else if (b.blocked_at) { return -1; }

                if (a.last_message_date && b.last_message_date) {
                    return b.last_message_date.localeCompare(a.last_message_date);
                } else if (a.last_message_date) {
                    return -1;
                } else if (b.last_message_date) {
                    return 1;
                } else {
                    return 0;
                }
            })
        );
    }, [localConversations]);

    useEffect(() => {
        setLocalConversations(conversations);
    }, [conversations]);

    useEffect(() => {
        const echo = window.Echo;
        if (!echo) {
            console.warn('Echo not initialized');
            return;
        }

        const channel = echo.join('Online')
            .here((users) => {
                const onlineUserObj = Object.fromEntries(
                    users.map(user => [user.id, user])
                );

                setOnlineUsers((prevOnlineUsers) => {
                    return { ...prevOnlineUsers, ...onlineUserObj };
                });
            })
            .joining((user) => {
                setOnlineUsers((prevOnlineUsers) => {
                    const updateUsers = { ...prevOnlineUsers };
                });
                updateUsers[user.id] = user;
                return updateUsers;
            })
            .leaving((user) => {
                setOnlineUsers((prevOnlineUsers) => {
                    const updateUsers = { ...prevOnlineUsers };
                    delete updateUsers[user.id];
                    return updateUsers;
                });
            })
            .error((error) => { console.error('Error joining channel:', error); });

        // return () => {
        //     if (channel && typeof channel.leave === 'function') {
        //         channel.leave();
        //     }
        // };

        return () => {
            echo.leave('Online');
        };
    }, []);

    return (
        <>
            
        </>
    );
}

export default ChatLayout;