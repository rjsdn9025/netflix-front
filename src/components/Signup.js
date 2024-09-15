import React, { useState } from 'react';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

// Cognito User Pool 설정
const userPool = new CognitoUserPool({
  UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
});

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    userPool.signUp(email, password, [
      { Name: 'name', Value: name },
      { Name: 'email', Value: email },
      { Name: 'phone_number', Value: phone }
    ], null, (err, result) => {
      setLoading(false);
      if (err) {
        setError(err.message || JSON.stringify(err));
      } else {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 1000); // 1초 후 로그인 페이지로 이동
      }
    });
  };

  return (
    <div className="signup-background">
      <div className="signup-container">
        <span className="close" onClick={() => navigate('/login')}>×</span>
        <h2>Sign Up</h2>
        {loading && <div>회원가입 처리 중입니다...</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {success && <div style={{ color: 'green' }}>회원가입이 성공적으로 완료되었습니다!</div>}
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
