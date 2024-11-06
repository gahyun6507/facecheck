import React from 'react';
import '../styles/DataTable.css';

function DataTable() {
  return (
    <div className="data-table">
      <table>
        <thead>
          <tr>
            <th>시간</th>
            <th>이름</th>
            <th>학번</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>24-10-28 10:05:39</td>
            <td>홍길동</td>
            <td>2022184765</td>
            <td>출석</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
