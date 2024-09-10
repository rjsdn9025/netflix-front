import React, { useState } from 'react';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { awsConfig } from '../awsConfig';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 useNavigate 추가
import './Signup.css'; // Signup.js에서

const userPool = new CognitoUserPool({
  UserPoolId: awsConfig.userPoolId,
  ClientId: awsConfig.clientId,
});

function Signup({ closeSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // useNavigate 추가

  const handleSignup = (e) => {
    e.preventDefault();

    userPool.signUp(email, password, [
      { Name: 'name', Value: name },
      { Name: 'email', Value: email },
      { Name: 'phone_number', Value: phone }
    ], null, (err, result) => {
      if (err) {
        setError(err.message || JSON.stringify(err));
      } else {
        setSuccess(true);
        navigate('/login'); // 회원가입 성공 시 로그인 페이지로 이동
      }
    });
  };

  return (
    <div className="signup-background">
      <div className="signup-container">
        <span className="close" onClick={() => navigate('/login')}>×</span> {/* X 버튼 클릭 시 로그인 페이지로 이동 */}
        <h2>Sign Up</h2>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {success && <div style={{ color: 'green' }}>Signup successful!</div>}
        <form onSubmit={handleSignup}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
