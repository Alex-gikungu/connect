import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Picker from 'emoji-picker-react';

const ChatRoom = () => {
  const { user } = useParams();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const navigate = useNavigate();

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        text: inputMessage,
        sender: 'Me',
        timestamp: new Date().toLocaleString(),
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
    }
  };

  const handleStartRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        recorder.start();

        recorder.ondataavailable = e => {
          setAudioChunks(prev => [...prev, e.data]);
        };

        recorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          const newMessage = {
            text: '',
            audio: audioUrl,
            sender: 'Me',
            timestamp: new Date().toLocaleString(),
          };
          setMessages([...messages, newMessage]);
          setAudioChunks([]);
        };
      });

    setRecording(true);
  };

  const handleStopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
    setRecording(false);
  };

  const onEmojiClick = (event, emojiObject) => {
    setInputMessage(prevInput => prevInput + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="chat-room">
      <div className="header">
        <button className="back-button" onClick={() => navigate('/new-chat')}>Back to New Chat</button>
      </div>
      <h1 className="chat-title">Chat with {user}</h1>
      <div className="messages-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender === 'Me' ? 'sent' : 'received'}`}>
            <div className="message-sender">{message.sender}</div>
            {message.audio ? (
              <audio controls>
                <source src={message.audio} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <div className="message-text">{message.text}</div>
            )}
            <div className="message-timestamp">{message.timestamp}</div>
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          className="message-input"
        />
        <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="emoji-button">
          😀
        </button>
        {showEmojiPicker && (
          <div className="emoji-picker">
            <Picker onEmojiClick={onEmojiClick} />
          </div>
        )}
        <button onClick={handleSendMessage} className="send-button">Send</button>
        <button
          onClick={recording ? handleStopRecording : handleStartRecording}
          className="record-button"
        >
          {recording ? 'Stop' : 'Record'}
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
