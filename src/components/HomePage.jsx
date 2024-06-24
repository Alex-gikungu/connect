import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ userId }) => {
  const [scanResult, setScanResult] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [about, setAbout] = useState('');
  const [savedProfile, setSavedProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate setting scan result
    setTimeout(() => {
      setScanResult({
        text: 'Scan Result Text',
        format: 'QR_CODE',
        userId: generateUserId(), // Assuming you have a function to generate a unique ID
      });
    }, 2000);
  }, []);

  const generateUserId = () => {
    // Function to generate a unique ID, example implementation
    return Math.random().toString(36).substr(2, 9);
  };

  const handleNewChat = () => {
    navigate('/new-chat');
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    if (profileImage && about.trim()) {
      const savedInfo = {
        profileImage,
        userId: scanResult.userId,
        about,
      };
      setSavedProfile(savedInfo);
      // Clear inputs after save
      setProfileImage(null);
      setAbout('');
    }
  };

  return (
    <div className="home-page">
      <h1>Welcome, User {userId}</h1>
      {scanResult && (
        <div>
          <p>Scan Result: {scanResult.text}</p>
          <p>Format: {scanResult.format}</p>
          <p>User ID: {scanResult.userId}</p>
        </div>
      )}
      {!savedProfile ? (
        <div className="profile-section">
          <div className="profile-image-label">
            <div className="profile-image-preview">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="profile-image" />
              ) : (
                <div className="profile-image-placeholder" onClick={() => document.getElementById('profile-image').click()}>
                  Upload Image
                </div>
              )}
            </div>
            <input
              type="file"
              id="profile-image"
              accept="image/*"
              onChange={handleImageUpload}
              className="profile-image-input"
              style={{ display: 'none' }}
            />
          </div>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Write a small about..."
            className="about-input"
          />
          <div className="button-container">
            <button onClick={handleSaveProfile} className="save-button">Save</button>
            <button onClick={handleNewChat} className="new-chat-button">New Chat</button>
          </div>
        </div>
      ) : (
        <div className="saved-profile-section">
          <h2>Saved Profile Information</h2>
          <div className="profile-info">
            <div className="profile-image-preview">
              <img src={savedProfile.profileImage} alt="Profile" className="profile-image" />
            </div>
            <p><strong>User ID:</strong> {savedProfile.userId}</p>
            <p><strong>About:</strong> {savedProfile.about}</p>
          </div>
          <button onClick={() => setSavedProfile(null)} className="edit-profile-button">Edit Profile</button>
          <button onClick={handleNewChat} className="new-chat-button">New Chat</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
