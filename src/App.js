import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Overview from './components/Overview';
import SystemLogChart from './components/SystemLogChart';
import Calendar from './components/Calendar';
import DataTable from './components/DataTable';
import Login from './components/login'; // Login 컴포넌트 임포트
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar /> {/* 사이드바 컴포넌트 */}
        <div className="main-content">
          <Header /> {/* 헤더 컴포넌트 */}
          <div className="content-area">
            <Routes>
              {/* 메인 페이지 경로 */}
              <Route path="/" element={<Dashboard />} />
              
              {/* 대시보드 경로: Overview 컴포넌트로 이동 */}
              <Route path="/dashboard" element={<Overview />} />
              
              {/* 출결통계 경로 */}
              <Route path="/attendance-stats" element={<SystemLogChart />} />

              {/* 캘린더 경로 */}
              <Route path="/calendar" element={<Calendar />} />

              {/* 출결기록 경로 */}
              <Route path="/attendance-records" element={<DataTable />} />

              {/* 로그인 경로 */}
              <Route path="/login" element={<Login />} /> {/* 로그인 페이지 추가 */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
