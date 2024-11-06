import React from 'react';
import { MdDashboard, MdPerson, MdSettings, MdLogout } from 'react-icons/md';
import { Link } from 'react-router-dom'; // Link를 가져옵니다.
import '../styles/Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>
        <li>
          <Link to="/"><MdLogout /> 출첵FACE</Link>
        </li> {/* 메인 페이지로 이동하는 링크 추가 */}
      </h2>
      <ul>
        <li>
          <Link to="/dashboard"><MdDashboard /> 대시보드</Link>
        </li>
        <li>
          <Link to="/attendance-records"><MdLogout /> 출결기록</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
