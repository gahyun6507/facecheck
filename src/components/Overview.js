import React, { useState, useEffect } from 'react';
import { FaUserCheck, FaUserTimes, FaClock, FaCheckCircle } from 'react-icons/fa';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import '../styles/Overview.css';

// Chart.js 요소 등록
Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

function Overview({ selectedSubject }) {
  const [presentStudents, setPresentStudents] = useState([]);
  const [absentStudents, setAbsentStudents] = useState([]);
  const [lateStudents, setLateStudents] = useState([]);
  const [attendanceRate, setAttendanceRate] = useState({});

  useEffect(() => {
    // 선택된 과목에 맞는 출석 데이터를 가져오는 함수
    const fetchAttendanceData = async () => {
      try {
        const response = await fetch(`http://18.116.93.222:8000/api/attendance?subject=${encodeURIComponent(selectedSubject)}`);
        const data = await response.json();

        // 출석, 결석, 지각 상태별 학생 이름 배열 생성
        const present = data.filter(student => student.attendance === '출석').map(student => student.stdName);
        const absent = data.filter(student => student.attendance === '결석').map(student => student.stdName);
        const late = data.filter(student => student.attendance === '지각').map(student => student.stdName);

        // 출석률 계산
        const total = data.length;
        const attendanceRateData = {
          출석: present.length,
          결석: absent.length,
          지각: late.length,
          출석률: total ? ((present.length / total) * 100).toFixed(1) : 0,
        };

        setPresentStudents(present);
        setAbsentStudents(absent);
        setLateStudents(late);
        setAttendanceRate(attendanceRateData);

      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      }
    };

    if (selectedSubject) {
      fetchAttendanceData();
    }

  }, [selectedSubject]); // selectedSubject가 변경될 때마다 출석 데이터 다시 가져오기

  // Chart.js에 표시할 데이터
  const attendanceData = {
    labels: ['출석', '결석', '지각'],
    datasets: [
      {
        data: [attendanceRate.출석 || 0, attendanceRate.결석 || 0, attendanceRate.지각 || 0],
        backgroundColor: ['#4CAF50', '#F44336', '#FF9800'],
      },
    ],
  };

  // System Log 차트 데이터와 옵션 설정
  const systemLogData = {
    labels: ['1주차', '2주차', '3주차', '4주차', '5주차', '6주차', '7주차', '8주차', '9주차', '10주차', '11주차', '12주차', '13주차', '14주차', '15주차', '16주차'],
    datasets: [
      {
        label: '접속 수',
        data: [12, 19, 3, 5, 2, 3, 9, 7, 11, 13, 8, 4, 15, 10, 20, 6],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const systemLogOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="overview">
      <div className="dashboard-cards2">
        <div className="card2">
          <FaUserCheck className="icon2" />
          <div className="card-content2">
            <div className="card-title2">출석</div>
            <div className="card-names2">
              <ul>
                {presentStudents.map((name, index) => (
                  <li key={index}>{name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="card2">
          <FaUserTimes className="icon2" />
          <div className="card-content2">
            <div className="card-title2">결석</div>
            <div className="card-names2">
              <ul>
                {absentStudents.map((name, index) => (
                  <li key={index}>{name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="card2">
          <FaClock className="icon2" />
          <div className="card-content2">
            <div className="card-title2">지각</div>
            <div className="card-names2">
              <ul>
                {lateStudents.map((name, index) => (
                  <li key={index}>{name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="card2">
          <FaCheckCircle className="icon2" />
          <div className="card-content3">
            <div className="card-title2">총 출석률</div>
            <div className="card-chart">
              <Pie data={attendanceData} />
            </div>
          </div>
        </div>
      </div>

      {/* System Log 차트 */}
      <div className="system-log-chart2">
        <h4>System Log</h4>
        <Bar data={systemLogData} options={systemLogOptions} />
      </div>
    </div>
  );
}

export default Overview;
