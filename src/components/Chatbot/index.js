import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./index.css"

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/initial-message')
      .then(response => setMessages(prev=>[{text: response.data.initial_message,user: false}]))
      .catch(error => console.error('Error fetching initial message:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, user: true };
    setMessages([...messages, userMessage]);

    axios.post('http://127.0.0.1:5000/api/chat', { message: input })
      .then(response => setMessages(prev => [...prev, response.data]))
      .catch(error => console.error('Error sending message:', error));

    setInput('');
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={msg.user ? 'chatbot-user' : 'chatbot-bot'}>
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chatbot-input-form">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="chatbot-input"
        />
        <button type="submit" className="chatbot-send-button">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
