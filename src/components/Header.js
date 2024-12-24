import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Header.css';

function Header({ setSelectedSubject }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const profileRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickOutside = (e) => {
    if (profileRef.current && !profileRef.current.contains(e.target)) {
      setIsProfileOpen(false);
    }
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setIsSearchFocused(false);
    }
  };

  const handleSubjectSelect = async (subject) => {
    if (subject === '전체' && location.pathname === '/attendance-records') {
      setSelectedSubject('');  // 수정된 부분: setSelectedSubject 사용
    } else {
      setSelectedSubject(subject);  // 수정된 부분: setSelectedSubject 사용
    }

    if (setSelectedSubject) {
      setSelectedSubject(subject === '전체' && location.pathname === '/attendance-records' ? '' : subject);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleLoginClick = () => {
    navigate('/login');
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
            {location.pathname === '/attendance-records' && (
              <p onClick={() => handleSubjectSelect('전체')}>전체</p>
            )}
            <p onClick={() => handleSubjectSelect('크로스플랫폼')}>크로스플랫폼</p>
            <p onClick={() => handleSubjectSelect('캡스톤')}>캡스톤</p>
            <p onClick={() => handleSubjectSelect('쿠버네티스')}>쿠버네티스</p>
          </div>
        )}
      </div>
      <div className="icons">
        <span className="icon">🔔</span>
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
