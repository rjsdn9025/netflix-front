import React from 'react';
import './WatchMovie.css';

function WatchMovie({ movieUrl, onClose }) {
  return (
    <div className="watch-movie-container">
      <iframe
        src={movieUrl}
        className="movie-player"
        width="1600"
        height="900"
        allowFullScreen
      />
      <div className="background-overlay" onClick={onClose}></div>
    </div>
  );
}

export default WatchMovie;
