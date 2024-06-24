import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCodeScanner from './QRCodeScanner';

const NewChat = () => {
  const [username, setUsername] = useState('');
  const [qrScanResult, setQrScanResult] = useState(null);
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('');
  const [statuses, setStatuses] = useState([]);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const navigate = useNavigate();

  const handleScan = (result) => {
    setQrScanResult(result.text);
    addUser(result.text);
    navigate('/'); // Redirect to home page after successful scan
  };

  const handleAddUser = () => {
    if (username) {
      addUser(username);
      setUsername('');
    }
  };

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const handleUserClick = (user) => {
    navigate(`/chat/${user}`);
  };

  const handleAddStatus = () => {
    if (status.trim()) {
      setStatuses([...statuses, status]);
      setStatus('');
    }
  };

  const handleStatusClick = (status) => {
    setCurrentStatus(status);
    setIsMouseOver(false);
  };

  useEffect(() => {
    if (currentStatus && !isMouseOver) {
      const timer = setTimeout(() => {
        setCurrentStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentStatus, isMouseOver]);

  return (
    <div className="new-chat-container">
      <h1>Start a New Chat</h1>
      <QRCodeScanner onScan={handleScan} />
      <div className="content-container">
        <div className="users-list">
          <h2>Added Users</h2>
          <ul>
            {users.map((user, index) => (
              <li key={index} onClick={() => handleUserClick(user)}>
                {user}
              </li>
            ))}
          </ul>
        </div>
        <div className="input-group">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="input-field"
          />
          <button onClick={handleAddUser} className="add-user-button">Add User</button>
        </div>
        <div className="status-section">
          <h2>Statuses</h2>
          <div className="status-input-group">
            <input
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              placeholder="Add a status"
              className="status-input"
            />
            <button onClick={handleAddStatus} className="post-status-button">Post</button>
          </div>
          <div className="statuses-list">
            {statuses.map((status, index) => (
              <div
                key={index}
                className="status-item"
                onClick={() => handleStatusClick(status)}
                onMouseEnter={() => setIsMouseOver(true)}
                onMouseLeave={() => setIsMouseOver(false)}
              >
                <div className={`status-circle ${currentStatus === status ? 'active' : ''}`}>
                  {currentStatus === status ? status : ''}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewChat;
