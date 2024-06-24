// src/components/Music.js
import React from 'react';
import './Music.css';

const Music = () => {
  return (
    <div className="music-container">
      <audio className="music-player" controls>
        <source src="your-music-file.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Music;
