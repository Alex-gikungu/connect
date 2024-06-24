// src/components/Messages.js
import React from 'react';
import './Messages.css';

const Messages = ({ messages }) => {
  return (
    <div className="messages-container">
      {messages.map((message, index) => (
        <div key={index} className="message-item">{message}</div>
      ))}
    </div>
  );
};

export default Messages;
