import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import UserContext from '../../context/UserContext';
import { useParams } from 'react-router-dom';

// Dynamically use server URL from environment variable or fallback to localhost
const socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000');

const Chat = () => {
    const { user } = useContext(UserContext);  // Get logged-in user's details
    const [message, setMessage] = useState('');  // For typing a new message
    const [messages, setMessages] = useState([]);  // For storing the message history
    const { recipient } = useParams();  // Get recipient from URL params

    useEffect(() => {
        // Receive the message coming to Client via socket
        socket.on('receiveMessage', (args) => {
            console.log(args);
            setMessages((prev) => [...prev, args]);
        });

        return () => socket.off('receiveMessage');
    }, [recipient, user.username]);

    const sendMessage = (e) => {
        e.preventDefault();

        const chatMessage = {
            sender: user.username,     // Current logged-in user
            recipient,                 // The user you're sending the message to
            text: message,
            timestamp: new Date(),
        };

        // Send the message to the server via socket
        socket.emit('sendMessage', chatMessage);
        setMessages((prev) => [...prev, chatMessage]);

        // Clear input
        setMessage('');
    };

    return (
        <div className="chat-section">
            <h2>Chat with {recipient}</h2>
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender === user.username ? "sent-message" : "received-message"}>
                        <span><strong>{msg.sender}:</strong> {msg.text}</span>
                        <hr />
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message"
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default Chat;
