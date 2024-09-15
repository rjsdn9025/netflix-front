import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';  // Profile 관련 스타일 import
import Favorites from './Favorites';  // 찜한 목록 컴포넌트 가져오기

function Profile({ onClose }) {
  const [userInfo, setUserInfo] = useState(null);
  const [isInfoLoaded, setIsInfoLoaded] = useState(false);  // 정보 로딩 여부 상태 추가
  const navigate = useNavigate();

  const loadUserInfo = () => {
    const token = localStorage.getItem('token');  // JWT 토큰 가져오기
    if (token && !isInfoLoaded) {  // 사용자 정보가 아직 로딩되지 않았다면
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserInfo(data);
          setIsInfoLoaded(true);  // 사용자 정보 로딩 완료
        })
        .catch((error) => {
          console.error('사용자 정보 가져오기 오류:', error);
        });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');  // JWT 토큰 삭제
    localStorage.removeItem('token_expiration');  // 만료 시간 삭제
    onClose();  // 모달 닫기

    // 로그아웃 후 즉시 로그인 페이지로 리다이렉트
    navigate('/login');
  };

  return (
    <div className="profile-modal">
      <div className="profile-modal-content">
        {/* 왼쪽 배너 */}
        <div className="modal-banner">
          <div className="banner-item" onClick={loadUserInfo}>내 정보</div>
          <div className="banner-item">찜한 목록</div>
          <div className="banner-item" onClick={handleLogout}>로그아웃</div> {/* 로그아웃 버튼 */}
        </div>

        {/* 오른쪽 프로필 정보 */}
        <div className="profile-info">
          <h2>닉네임</h2>

          {/* 사용자 정보 */}
          {isInfoLoaded && userInfo ? (
            <div className="user-info">
              <p>이름: {userInfo.name}</p>
              <p>이메일: {userInfo.email}</p>
              {/* 추가적인 사용자 정보 */}
            </div>
          ) : (
            <p>내 정보를 확인하려면 "내 정보"를 클릭하세요.</p>
          )}

          {/* 찜한 영화 목록 */}
          <h3>찜한 영화 목록</h3>
          <Favorites />  {/* 찜한 목록 표시 */}

          {/* 감사 인사 */}
          <p>항상 저희 ROCKET 사이트를 이용해주셔서 감사합니다.</p>
        </div>

        {/* 닫기 버튼 */}
        <span className="profile-close" onClick={onClose}>&times;</span>
      </div>
    </div>
  );
}

export default Profile;
