import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Overview from './components/Overview';
import SystemLogChart from './components/SystemLogChart';
import Calendar from './components/Calendar';
import DataTable from './components/DataTable';
import Login from './components/login';
import WebCam from './components/WebCam'; // 새 컴포넌트 추가
import './App.css';

function App() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState('');

  useEffect(() => {
    fetch('http://18.116.93.222:8000/api/attendance')
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched attendance data:", data);
        setAttendanceData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // subject에 맞는 데이터만 필터링하여 전달
  const filteredData = selectedSubject
    ? attendanceData.filter((data) => data.subject === selectedSubject)
    : attendanceData;

  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Header setSelectedSubject={setSelectedSubject} />
          <div className="content-area">
            <Routes>
              <Route path="/" element={<Dashboard selectedSubject={selectedSubject} />} />
              <Route path="/dashboard" element={<Overview selectedSubject={selectedSubject} />} />
              <Route path="/attendance-stats" element={<SystemLogChart />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/attendance-records" element={
                loading ? (
                  <div>로딩 중...</div>
                ) : (
                  <DataTable attendanceData={filteredData} loading={loading} />
                )
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/webcam" element={<WebCam />} /> {/* /webcam 경로 추가 */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
