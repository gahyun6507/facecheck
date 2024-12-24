// DataTable.js
import React, { useEffect, useState } from 'react';
import SystemLogChart from './SystemLogChart';
import Calendar from './Calendar';
import DataTable from './DataTable';
import '../styles/Dashboard.css';
import { FaUserCheck, FaUserTimes, FaClock, FaCheckCircle } from 'react-icons/fa';

function Dashboard({ selectedSubject, setSelectedSubject }) { // props로 selectedSubject와 setSelectedSubject 받기
  const [attendanceCounts, setAttendanceCounts] = useState({
    present: 0,
    absent: 0,
    late: 0,
  });
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      if (!selectedSubject) return;

      try {
        const response = await fetch(`http://18.116.93.222:8000/api/attendance?subject=${encodeURIComponent(selectedSubject)}`);
        const data = await response.json();

        const counts = data.reduce(
          (acc, record) => {
            if (record.attendance === '출석') {
              acc.present += 1;
            } else if (record.attendance === '결석') {
              acc.absent += 1;
            } else if (record.attendance === '지각') {
              acc.late += 1;
            }
            return acc;
          },
          { present: 0, absent: 0, late: 0 }
        );

        setAttendanceCounts(counts);
        setAttendanceData(data);
      } catch (error) {
        console.error('출석 데이터를 가져오는 데 오류가 발생했습니다:', error);
      }
    };

    fetchAttendanceData();
  }, [selectedSubject]);

  const totalStudents = attendanceCounts.present + attendanceCounts.absent + attendanceCounts.late;
  const attendanceRate = totalStudents > 0 
    ? ((attendanceCounts.present / totalStudents) * 100).toFixed(2) 
    : 0;

  return (
    <div className="dashboard">
      <div className="dashboard-cards">
        <div className="card">
          <FaUserCheck className="icon" />
          <div className="card-content">
            <div className="card-title">출석</div>
            <div className="card-value">{attendanceCounts.present}명</div>
          </div>
        </div>
        <div className="card">
          <FaUserTimes className="icon" />
          <div className="card-content">
            <div className="card-title">결석</div>
            <div className="card-value">{attendanceCounts.absent}명</div>
          </div>
        </div>
        <div className="card">
          <FaClock className="icon" />
          <div className="card-content">
            <div className="card-title">지각</div>
            <div className="card-value">{attendanceCounts.late}명</div>
          </div>
        </div>
        <div className="card">
          <FaCheckCircle className="icon" />
          <div className="card-content">
            <div className="card-title">총 출석률</div>
            <div className="card-value">{attendanceRate}%</div>
          </div>
        </div>
      </div>
      <div className="system-log-calendar-container">
        <SystemLogChart />
        <Calendar />
      </div>
      <DataTable attendanceData={attendanceData} subject={selectedSubject} />
    </div>
  );
}

export default Dashboard;
