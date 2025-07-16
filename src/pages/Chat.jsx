import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import { messagesAPI, usersAPI, communitiesAPI } from "../services/api";

export default function Chat({ currentUser }) {
    const [currentChatKey, setCurrentChatKey] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [joinedCommunities, setJoinedCommunities] = useState([]);
    const [messages, setMessages] = useState({});
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const chatRef = useRef(null);
    const pollingIntervalRef = useRef(null);

    useEffect(() => {
        if (currentUser) {
            loadInitialData();
        }
    }, [currentUser]);

    // Polling effect - update messages every 2 seconds
    useEffect(() => {
        if (currentChatKey) {
            // Clear any existing interval
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current);
            }

            // Start polling every 2 seconds
            pollingIntervalRef.current = setInterval(() => {
                pollMessages();
            }, 2000);

            // Initial load
            pollMessages();

            // Cleanup on unmount or when currentChatKey changes
            return () => {
                if (pollingIntervalRef.current) {
                    clearInterval(pollingIntervalRef.current);
                }
            };
        }
    }, [currentChatKey]);

    const pollMessages = async () => {
        if (!currentChatKey) return;

        try {
            let messagesData = [];
            
            if (currentChatKey.startsWith('user-')) {
                const userId = parseInt(currentChatKey.split('-')[1]);
                messagesData = await messagesAPI.getDirectMessages(userId);
            } else if (currentChatKey.startsWith('community-')) {
                const communityId = parseInt(currentChatKey.split('-')[1]);
                messagesData = await messagesAPI.getCommunityMessages(communityId);
            }

            // Only update if messages have changed (to avoid unnecessary re-renders)
            setMessages(prev => {
                const currentMessages = prev[currentChatKey] || [];
                const newMessages = messagesData;
                
                // Check if messages have changed by comparing lengths and last message
                if (currentMessages.length !== newMessages.length) {
                    // Auto-scroll to bottom when new messages arrive
                    setTimeout(() => {
                        if (chatRef.current) {
                            chatRef.current.scrollTop = chatRef.current.scrollHeight;
                        }
                    }, 100);
                    
                    return {
                        ...prev,
                        [currentChatKey]: newMessages
                    };
                }
                
                // Check if last message is different
                if (currentMessages.length > 0 && newMessages.length > 0) {
                    const lastCurrent = currentMessages[currentMessages.length - 1];
                    const lastNew = newMessages[newMessages.length - 1];
                    
                    if (lastCurrent.id !== lastNew.id || lastCurrent.content !== lastNew.content) {
                        // Auto-scroll to bottom when new messages arrive
                        setTimeout(() => {
                            if (chatRef.current) {
                                chatRef.current.scrollTop = chatRef.current.scrollHeight;
                            }
                        }, 100);
                        
                        return {
                            ...prev,
                            [currentChatKey]: newMessages
                        };
                    }
                }
                
                return prev;
            });
        } catch (err) {
            console.error('Failed to poll messages:', err);
        }
    };

    const loadInitialData = async () => {
        try {
            setLoading(true);
            const [usersResponse, communitiesResponse] = await Promise.all([
                usersAPI.getAll(),
                communitiesAPI.getAll()
            ]);

            // Filter out current user and format contacts
            const filteredUsers = usersResponse.filter(user => user.id !== currentUser.id);
            setContacts(filteredUsers);

            // Get joined communities
            const joinedComms = communitiesResponse.filter(comm => comm.is_joined);
            setJoinedCommunities(joinedComms);

            // Set initial chat if there are contacts
            if (filteredUsers.length > 0) {
                setCurrentChatKey(`user-${filteredUsers[0].id}`);
            } else if (joinedComms.length > 0) {
                setCurrentChatKey(`community-${joinedComms[0].id}`);
            }
        } catch (err) {
            setError("Failed to load chat data");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (currentChatKey && !messages[currentChatKey]) {
            loadMessages();
        }
    }, [currentChatKey]);

    const loadMessages = async () => {
        if (!currentChatKey) return;

        try {
            let messagesData = [];
            
            if (currentChatKey.startsWith('user-')) {
                const userId = parseInt(currentChatKey.split('-')[1]);
                messagesData = await messagesAPI.getDirectMessages(userId);
            } else if (currentChatKey.startsWith('community-')) {
                const communityId = parseInt(currentChatKey.split('-')[1]);
                messagesData = await messagesAPI.getCommunityMessages(communityId);
            }

            setMessages(prev => ({
                ...prev,
                [currentChatKey]: messagesData
            }));
        } catch (err) {
            console.error('Failed to load messages:', err);
        }
    };

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages, currentChatKey]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!message.trim() || !currentChatKey) return;

        try {
            let receiverId = null;
            let communityId = null;

            if (currentChatKey.startsWith('user-')) {
                receiverId = parseInt(currentChatKey.split('-')[1]);
            } else if (currentChatKey.startsWith('community-')) {
                communityId = parseInt(currentChatKey.split('-')[1]);
            }

            const newMessage = await messagesAPI.sendMessage(message, receiverId, communityId);
            
            setMessages(prev => ({
                ...prev,
                [currentChatKey]: [...(prev[currentChatKey] || []), newMessage]
            }));
            
            setMessage("");
        } catch (err) {
            console.error('Failed to send message:', err);
        }
    };

    const getChatTitle = () => {
        if (!currentChatKey) return "Chat";
        
        if (currentChatKey.startsWith("user-")) {
            const userId = parseInt(currentChatKey.split('-')[1]);
            const user = contacts.find((c) => c.id === userId);
            return user?.full_name || "Chat";
        } else {
            const communityId = parseInt(currentChatKey.split('-')[1]);
            const comm = joinedCommunities.find((c) => c.id === communityId);
            return comm?.name + " (Community)" || "Community";
        }
    };

    // Reset new message count when switching chats
    useEffect(() => {
        // setNewMessageCount(0); // This line is removed
    }, [currentChatKey]);

    // Cleanup polling interval on component unmount
    useEffect(() => {
        return () => {
            if (pollingIntervalRef.current) {
                clearInterval(pollingIntervalRef.current);
            }
        };
    }, []);

    if (!currentUser) {
        return (
            <div className="chat-container">
                <div className="main-container">
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center text-gray-600">
                            <p>Please log in to access chat</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="chat-container">
                <div className="main-container">
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                            <p className="mt-2 text-gray-600">Loading chat...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="chat-container">
                <div className="main-container">
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center text-red-600">
                            <p>{error}</p>
                            <button 
                                onClick={loadInitialData}
                                className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="chat-container">
            {/* Main */}
            <div className="main-container">
                {/* Sidebar */}
                <aside className="sidebar">
                    <h2>Direct Messages</h2>
                    <ul id="contacts-list">
                        {contacts.length === 0 ? (
                            <li style={{ fontStyle: "italic", color: "#7f8c8d" }}>No contacts available</li>
                        ) : (
                            contacts.map((user) => (
                                <li
                                    key={user.id}
                                    className={currentChatKey === `user-${user.id}` ? "active" : ""}
                                    onClick={() => setCurrentChatKey(`user-${user.id}`)}
                                >
                                    {user.full_name}
                                </li>
                            ))
                        )}
                    </ul>

                    <h2>Communities</h2>
                    <ul id="communities-list">
                        {joinedCommunities.length === 0 ? (
                            <li style={{ fontStyle: "italic", color: "#7f8c8d" }}>No communities joined yet</li>
                        ) : (
                            joinedCommunities.map((comm) => (
                                <li
                                    key={comm.id}
                                    className={currentChatKey === `community-${comm.id}` ? "active" : ""}
                                    onClick={() => setCurrentChatKey(`community-${comm.id}`)}
                                >
                                    {comm.name}
                                </li>
                            ))
                        )}
                    </ul>
                </aside>

                {/* Chat Panel */}
                <section className="chat-section">
                    <div id="chat-header" className="chat-header">
                        {getChatTitle()}
                    </div>
                    <div id="chat-messages" className="chat-messages" ref={chatRef}>
                        {(messages[currentChatKey] || []).map((msg, i) => {
                            const isOwnMessage = msg.sender_id === currentUser.id;
                            
                            return (
                                <div key={i} className={`message ${isOwnMessage ? "self" : ""}`}>
                                    {msg.content}
                                </div>
                            );
                        })}
                    </div>
                    <form onSubmit={handleSend} className="message-form">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                            required
                        />
                        <button type="submit">Send</button>
                    </form>
                </section>
            </div>
        </div>
    );
}