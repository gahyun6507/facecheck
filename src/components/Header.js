import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate 훅 추가
import '../styles/Header.css';

function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const profileRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();  // useNavigate 훅 사용

  const handleClickOutside = (e) => {
    if (profileRef.current && !profileRef.current.contains(e.target)) {
      setIsProfileOpen(false);
    }
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setIsSearchFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLoginClick = () => {
    navigate('/login');  // 로그인 버튼 클릭 시 '/login' 경로로 이동
  };

  return (
    <header className="header">
      <div className="search-container" ref={searchRef}>
        <input
          type="text"
          placeholder="Search..."
          className="search-bar"
          onFocus={() => setIsSearchFocused(true)}
        />
        {isSearchFocused && (
          <div className="search-dropdown">
            <p>크로스플랫폼</p>
            <p>캡스톤</p>
            <p>쿠버네티스</p>
          </div>
        )}
      </div>
      <div className="icons">
        <span className="icon" onClick={() => setIsProfileOpen(!isProfileOpen)}>👤</span>
      </div>
      {isProfileOpen && (
        <div className="profile-dropdown" ref={profileRef}>
          <div className="profile-info">
            <span className="profile-icon">👤</span>
            <p>반갑습니다, OOO님</p>
          </div>
          <button className="profile-btn" onClick={handleLoginClick}>로그인</button>
          <button className="profile-btn">로그아웃</button>
        </div>
      )}
    </header>
  );
}

export default Header;
