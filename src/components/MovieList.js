import React, { useEffect, useState } from 'react';
import MovieDetail from './MovieDetail'; // MovieDetail을 모달로 사용

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); // 선택된 영화를 저장

  useEffect(() => {
    // 백엔드 API로부터 영화 목록 가져오기
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/movies`)
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error('영화 데이터를 가져오는 중 오류 발생:', error));
  }, []);

  const openModal = (movie) => {
    setSelectedMovie(movie); // 영화 선택 시 모달 열기
  };

  const closeModal = () => {
    setSelectedMovie(null); // 모달 닫기
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

      {selectedMovie && (  // 영화가 선택되었을 때만 모달을 렌더링
        <MovieDetail movie={selectedMovie} onClose={closeModal} />
      )}
    </section>
  );
}

export default MovieList;
