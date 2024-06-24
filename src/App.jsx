import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QRCodeScanner from './components/QRCodeScanner';
import HomePage from './components/HomePage';
import NewChat from './components/NewChat';
import ChatRoom from './components/ChatRoom';
import ErrorBoundary from './ErrorBoundary';

const App = () => {
  const [userId, setUserId] = useState(null);

  const handleScan = (id) => {
    setUserId(id);
  };

  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route
            path="/"
            element={
              userId ? (
                <HomePage userId={userId} />
              ) : (
                <QRCodeScanner onScan={handleScan} />
              )
            }
          />
          <Route path="/yy" element={<HomePage />} />
          <Route path="/new-chat" element={<NewChat />} />
          <Route path="/chat/:user" element={<ChatRoom />} />
          {/* Add other routes as needed */}
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
