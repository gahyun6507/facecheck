import React, { useEffect, useState } from 'react';
import '../styles/DataTable.css';

function DataTable({ attendanceData = [], loading }) {
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    console.log("DataTable - attendanceData 변경 감지:", attendanceData);

    const formatDate = (dateString) => {
      if (!dateString) return "시간 없음";
      const date = new Date(dateString);
      if (isNaN(date)) return "시간 없음";
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const formatted = attendanceData.map((record) => ({
      ...record,
      formattedDate: formatDate(record.date),
    }));

    setFormattedData(formatted);
  }, [attendanceData]);

  if (loading) {
    return <div className="loading">데이터 로딩 중...</div>;
  }

  if (formattedData.length === 0) {
    return <div className="loading">출석 데이터가 없습니다.</div>;
  }

  const renderAttendanceStatus = (status) => {
    switch (status) {
      case '출석':
        return <span className="attendance-status present">출석</span>;
      case '지각':
        return <span className="attendance-status late">지각</span>;
      case '결석':
        return <span className="attendance-status absent">결석</span>;
      default:
        return <span className="attendance-status unknown">상태 없음</span>;
    }
  };

  return (
    <div className="data-table">
      <table>
        <thead>
          <tr>
            <th>시간</th>
            <th>과목</th>
            <th>이름</th>
            <th>학번</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {formattedData.map((record, index) => (
            <tr key={index}>
              <td>{record.formattedDate}</td>
              <td>{record.subject}</td>
              <td>{record.stdName || "이름 없음"}</td>
              <td>{record.stdNum || "학번 없음"}</td>
              <td>{renderAttendanceStatus(record.attendance)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
