import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom'; 
import MovieList from './components/MovieList';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile'; 
import MovieDetail from './components/MovieDetail';  
import Slider from './components/Slider';  
import './App.css'; // 메인 스타일 가져오기

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // 프로필 모달 상태

  // 로그인 상태 확인 (토큰 만료 시간도 포함)
  useEffect(() => {
    const token = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('token_expiration');

    if (token && expirationTime && new Date().getTime() < expirationTime) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      localStorage.removeItem('token');
      localStorage.removeItem('token_expiration');
    }
  }, []);

  // 로그아웃 시 리다이렉트 확인
  useEffect(() => {
    if (!isAuthenticated && window.location.pathname !== '/login') {
      window.location.href = '/login';  // 로그인 페이지로 강제 리다이렉트
    }
  }, [isAuthenticated]);

  const openProfile = () => {
    setIsProfileOpen(true);
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  return (
    <Router>
      <div className={`App ${!isAuthenticated ? 'background' : ''}`}>
        {/* 로그인한 사용자만 상단 배너와 슬라이더를 표시 */}
        {isAuthenticated && (
          <header>
            <div className="logo">
              <img src="https://df5vvgenn2hzh.cloudfront.net/image/Logo.png" alt="ROCKET 로고" />
            </div>
            <div className="profile" id="profile-tab">
              <button onClick={openProfile}>프로필</button> {/* 프로필 모달 열기 */}
            </div>
            <nav className="nav-links">
              <ul>
                <li><Link to="/">홈</Link> |</li>
                <li><a href="#">검색</a> |</li>
                <li><a href="#">영화</a> |</li>
                <li><a href="#">시리즈</a></li>
              </ul>
            </nav>
            <Slider />
          </header>
        )}

        {/* 프로필 모달 */}
        {isProfileOpen && <Profile onClose={closeProfile} />}

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

          {/* 영화 상세 페이지 */}
          <Route
            path="/movies/:movieId"
            element={isAuthenticated ? <MovieDetail /> : <Navigate to="/login" />}
          />

          {/* 영화 시청 페이지 추가 */}
          <Route
            path="/movies/:movieId/watch"
            element={isAuthenticated ? <MovieWatch /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

