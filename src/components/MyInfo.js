import React, { useEffect, useState } from 'react';

function MyInfo() {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setUserInfo(data))
      .catch((error) => console.error('유저 정보를 가져오는 중 오류 발생:', error));
  }, []);

  return (
    <div>
      <h2>내 정보</h2>
      <p>이름: {userInfo.name}</p>
      <p>이메일: {userInfo.email}</p>
    </div>
  );
}

export default MyInfo;
