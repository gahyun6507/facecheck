import React from 'react';
import { FaUserCheck, FaUserTimes, FaClock, FaCheckCircle } from 'react-icons/fa';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import '../styles/Overview.css';
import '../styles/SystemLogChart.css';
import SystemLogChart from './SystemLogChart'; // SystemLogChart 컴포넌트 가져오기

// Chart.js 요소 등록
Chart.register(ArcElement, Tooltip, Legend);

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
          <div className="card-content2">
            <div className="card-title2">총 출석률</div>
            <div className="card-chart">
              <Pie data={attendanceData} />
            </div>
          </div>
        </div>
      </div>

      {/* SystemLogChart 컴포넌트 추가 */}
      <SystemLogChart />
    </div>
  );
}

export default Overview;