import React, { useEffect, useState } from 'react';

function FavoriteMovies() {
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token'); // localStorage에서 JWT 토큰 가져오기

        if (!token) {
            setError('로그인이 필요합니다.');  // 로그인하지 않은 경우 에러 메시지 표시
            return;
        }

        // 백엔드 API로부터 찜한 영화 목록 가져오기 (JWT 토큰 포함)
        fetch('${process.env.REACT_APP_BACKEND_URL}/api/movies/favorites', {
            headers: {
                Authorization: `Bearer ${token}`,  // JWT 토큰을 Authorization 헤더에 추가
            }
        })
        .then(response => response.json())
        .then(data => setFavorites(data.favorites))
        .catch(error => {
            console.error('찜한 영화 데이터를 가져오는 중 오류 발생:', error);
            setError('찜한 영화를 불러오는 데 실패했습니다.');
        });
    }, []);

    if (error) {
        return <div>{error}</div>;  // 에러 메시지 출력
    }

    if (favorites.length === 0) {
        return <div>찜한 영화가 없습니다.</div>;
    }

    return (
        <section className="favorite-movies-section">
            <h2>My Favorite Movies</h2>
            <div className="movie-grid">
                {favorites.map(movie => (
                    <div key={movie.id} className="movie-item">
                        <img src={movie.poster_url} alt={movie.title} />
                        <p>{movie.title}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default FavoriteMovies;
