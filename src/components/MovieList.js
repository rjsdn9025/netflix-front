// MovieList.js (영화 카테고리 섹션)
import React, { useEffect, useState } from 'react';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    // 백엔드 API로부터 영화 목록 가져오기
    fetch(`${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_PORT}/api/movies`)
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error('영화 데이터를 가져오는 중 오류 발생:', error));
  }, []);

  const openModal = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <section className="movie-section">
      <h2>오리지널 콘텐츠</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-item" onClick={() => openModal(movie)}>
            <img src={movie.poster_url} alt={movie.title} />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <div className="modal-video">
              <iframe
                src={selectedMovie.trailer_url}
                width="100%"
                height="315"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
            <div className="modal-details">
              <h2>{selectedMovie.title}</h2>
              <p>{selectedMovie.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default MovieList;
