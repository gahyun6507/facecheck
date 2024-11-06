import React from 'react';
import { FaUserCheck, FaUserTimes, FaClock, FaCheckCircle } from 'react-icons/fa';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import '../styles/Overview.css';
import SystemLogChart from './SystemLogChart'; // SystemLogChart 컴포넌트 가져오기

// Chart.js 요소 등록
Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

function Overview() {
  // 출석, 결석, 지각 수치와 출석률 설정
  const attendanceData = {
    labels: ['출석', '결석', '지각'],
    datasets: [
      {
        data: [15, 5, 1], // 예시 데이터
        backgroundColor: ['#4CAF50', '#F44336', '#FF9800'], // 각 항목 색상
      },
    ],
  };


  // System Log 차트 데이터와 옵션 설정
  const systemLogData = {
    labels: ['1주차', '2주차', '3주차', '4주차', '5주차', '6주차', '7주차', '8주차','9주차', '10주차', '11주차', '12주차', '13주차', '14주차', '15주차', '16주차'],
    datasets: [
      {
        label: '접속 수',
        data: [12, 19, 3, 5, 2, 3, 9, 7,11,13,8,4,15,10,20,6],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const systemLogOptions = {
    responsive: true,
    maintainAspectRatio: false, // 비율 유지하지 않음
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
                <li>김가현</li>
                <li>김가현</li>
                <li>김가현</li>
                {/* 더 많은 이름을 추가할 수 있습니다 */}
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
                <li>김가현</li>
                <li>김가현</li>
                <li>김가현</li>
                <li>김가현</li>
                <li>김가현</li>
                <li>김가현</li>
                <li>김가현</li>
                <li>김가현</li>
                <li>김가현</li>
                <li>김가현</li>
                <li>김가현</li>
                <li>김가현</li>
                
                {/* 더 많은 이름을 추가할 수 있습니다 */}
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
                <li>김가현</li>
                {/* 지각한 학생 이름을 추가할 수 있습니다 */}
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