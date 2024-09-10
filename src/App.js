import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MovieList from './components/MovieList';
import Login from './components/Login';
import Signup from './components/Signup';  
import Slider from './components/Slider';  
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 로그인 상태 확인 (토큰 만료 시간도 포함)
  useEffect(() => {
    const token = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('token_expiration');

    if (token && expirationTime && new Date().getTime() < expirationTime) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      localStorage.removeItem('token');  // 만료된 토큰 삭제
      localStorage.removeItem('token_expiration');
    }
  }, []);

  return (
    <Router>
      <div className={`App ${!isAuthenticated ? 'background' : ''}`}>
        {/* 로그인한 사용자만 상단 배너와 슬라이더를 표시 */}
        {isAuthenticated && (
          <header>
            <div className="logo">
              <img src="https://web-images-kmhyuk1018.s3.ap-northeast-2.amazonaws.com/logo.png" alt="ROCKET 로고" />
            </div>
            <div className="profile" id="profile-tab">프로필</div>
            <nav className="nav-links">
              <ul>
                <li><a href="#">홈</a> |</li>
                <li><a href="#">검색</a> |</li>
                <li><a href="#">영화</a> |</li>
                <li><a href="#">시리즈</a></li>
              </ul>
            </nav>
            <Slider />
          </header>
        )}

        <Routes>
          {/* 로그인한 사용자만 접근 가능한 메인 페이지 */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <MovieList />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* 회원가입 페이지 */}
          <Route
            path="/signup"
            element={
              !isAuthenticated ? (
                <div className="signup-background">
                  <Signup />
                </div>
              ) : (
                <Navigate to="/" />
              )
            }
          />

          {/* 로그인 페이지 */}
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <div className="login-background">
                  <Login setIsAuthenticated={setIsAuthenticated} />
                </div>
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
