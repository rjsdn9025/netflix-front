import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MovieWatch.css'; // 스타일 파일 추가

function MovieWatch() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 사용

  useEffect(() => {
    fetch(`/api/movies/${movieId}/watch`)
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => {
        setError('영화 정보를 가져오는 데 실패했습니다.');
      });
  }, [movieId]);

  const handleOutsideClick = (e) => {
    // 클릭한 부분이 비디오가 아닌 경우에만 상세 페이지로 이동
    if (e.target.classList.contains('movie-watch-container')) {
      navigate(`/`);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!movie) {
    return <div>영화 데이터를 불러오는 중...</div>;
  }

  return (
    <div className="movie-watch-container" onClick={handleOutsideClick}>
      <video
        className="movie-video"
        controls
        controlsList="nodownload"  // 다운로드 버튼 비활성화
        autoPlay
        onContextMenu={(e) => e.preventDefault()} // 우클릭 비활성화
      >
        <source src={movie.watch_url} type="video/mp4" />
        브라우저가 비디오를 지원하지 않습니다.
      </video>
    </div>
  );
}

export default MovieWatch;
