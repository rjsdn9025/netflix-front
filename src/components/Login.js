import React, { useState } from 'react';
import { CognitoUser, AuthenticationDetails, CognitoUserPool } from 'amazon-cognito-identity-js';
import { useNavigate } from 'react-router-dom';
import './Login.css';

// Cognito User Pool 설정
const userPool = new CognitoUserPool({
  UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
});

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (result) => {
        const token = result.getAccessToken().getJwtToken();
        const expirationTime = new Date().getTime() + 6 * 60 * 60 * 1000; // 6시간 만료 시간
        localStorage.setItem('token', token);
        localStorage.setItem('token_expiration', expirationTime);
        setIsAuthenticated(true);
        navigate('/');  // 메인 페이지로 이동
      },
      onFailure: (err) => {
        setError(err.message || '로그인에 실패했습니다.');
      },
    });
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <h2>Login</h2>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <button onClick={() => navigate('/signup')}>Sign Up</button> {/* 회원가입 버튼 */}
      </div>
    </div>
  );
}

export default Login;
