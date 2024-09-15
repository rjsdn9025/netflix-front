import React, { useEffect, useState } from 'react';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/me/favorites`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setFavorites(data))
      .catch((error) => console.error('찜한 목록을 가져오는 중 오류 발생:', error));
  }, []);

  return (
    <div>
      {favorites.length > 0 ? (
        favorites.map((movie) => (
          <div key={movie.title} className="favorite-item">
            <img src={movie.poster_url} alt={movie.title} className="favorite-poster" />
            <p className="favorite-title">{movie.title}</p>
          </div>
        ))
      ) : (
        <p>찜한 영화가 없습니다.</p>
      )}
    </div>
  );
}

export default Favorites;
