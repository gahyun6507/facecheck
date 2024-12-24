import React, { useState } from 'react';
import axios from 'axios';
import '../styles/login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true); 
  setErrorMessage('');

  try {
    const response = await axios.post('http://18.116.93.222:8000/api/login', {
      id: username,
      pw: password,
    });

    // 응답 메시지를 알림으로 표시
    alert(response.data.message || '로그인 성공');
    setLoading(false);

    window.location.href = '/dashboard';  // 대시보드 페이지로 리다이렉트

  } catch (error) {
    setLoading(false);
    setErrorMessage(error.response?.data?.message || '로그인 실패');
  }
};

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">아이디</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="아이디를 입력하세요"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            required
          />
        </div>
        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? '로그인 중...' : '로그인'}
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default Login;
