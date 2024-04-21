import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import '../styles/Chat.css'; // Import your CSS file

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const socket = io('http://localhost:8080');

    useEffect(() => {
        socket.on('message', message => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        socket.emit('message', input);
        setInput('');
    };

    return (
        <div className="chat-container">
            <ul className="chat-messages">
                {messages.map((message, index) => (
                    <li key={index} className="chat-message">{message}</li>
                ))}
            </ul>
            <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                className="chat-input"
            />
            <button onClick={sendMessage} className="send-button">Send</button>
        </div>
    );
};

export default Chat;
