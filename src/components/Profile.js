import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('token_expiration');

    if (!token || new Date().getTime() > expirationTime) {
      alert('로그인이 필요합니다.');
      localStorage.removeItem('token');
      localStorage.removeItem('token_expiration');
      navigate('/login');  // 로그인 페이지로 리디렉션
      return;
    }

    axios
      .get('/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setUserInfo(response.data))
      .catch((error) => {
        console.error('프로필 정보를 가져오는 중 오류가 발생했습니다:', error);
      });
  }, [navigate]);

  if (!userInfo) return <div>로딩 중...</div>;

  return (
    <div>
      <h1>{userInfo.name}</h1>
      <p>Email: {userInfo.email}</p>
      <p>Age: {userInfo.age}</p>
      <p>Favorites: {userInfo.favorites.join(', ')}</p>
      <button onClick={logout}>로그아웃</button>
    </div>
  );
}

const logout = () => {
  localStorage.removeItem('token');  // 로그아웃 시 토큰 삭제
  localStorage.removeItem('token_expiration');
  window.location.href = '/login';   // 로그인 페이지로 리디렉션
};

export default Profile;
