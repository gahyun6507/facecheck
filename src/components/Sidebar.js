import React from 'react';
import { MdDashboard, MdPerson, MdSettings, MdLogout, MdCameraAlt } from 'react-icons/md';
import { NavLink } from 'react-router-dom'; // NavLink로 교체
import '../styles/Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>
        <li>
          <NavLink to="/" className='snapcheck-title'><MdLogout /> SnapCheck</NavLink>
        </li>
      </h2>
      <ul>
        <li>
          <NavLink to="/dashboard" activeClassName="active"><MdDashboard /> 대시보드</NavLink>
        </li>
        <li>
          <NavLink to="/attendance-records" activeClassName="active"><MdLogout /> 출결기록</NavLink>
        </li>
        <li>
          <NavLink to="/webcam" activeClassName="active"><MdCameraAlt /> 출석체크</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
