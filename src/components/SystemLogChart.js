import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '../styles/SystemLogChart.css';

// 필요한 스케일 및 플러그인 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ['1주차', '2주차', '3주차', '4주차', '5주차', '6주차', '7주차','8주차'],
  datasets: [
    {
      label: '접속 수',
      data: [12, 19, 3, 5, 2, 3, 9, 7,5],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false, // 비율 유지하지 않음
};

function SystemLogChart() {
  return (
    <div className="system-log-chart">
      <h4>System Log</h4>
      <Bar data={data} options={options} />
    </div>
  );
}

export default SystemLogChart;
