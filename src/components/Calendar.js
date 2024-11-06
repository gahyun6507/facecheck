// Calendar.js
import React, { useState } from 'react';
import { Calendar as ReactCalendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/Calendar.css';

function DashboardCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [schedule, setSchedule] = useState({});
  const [newSchedule, setNewSchedule] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddSchedule = () => {
    if (newSchedule.trim()) {
      const dateKey = selectedDate.toDateString();
      setSchedule((prev) => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), newSchedule]
      }));
      setNewSchedule(""); // 입력창 초기화
    }
  };

  return (
    <div className="calendar">
      <ReactCalendar
        className="react-calendar"
        onClickDay={handleDateChange}
        value={selectedDate}
        tileContent={({ date, view }) => view === 'month' && schedule[date.toDateString()]
          ? <div className="schedule-dot">•</div> // 일정 표시 dot 추가
          : null
        }
      />
      <div className="schedule-add">
        <h4>일정 추가</h4>
        <input
          type="text"
          placeholder="일정을 입력하세요..."
          value={newSchedule}
          onChange={(e) => setNewSchedule(e.target.value)}
        />
        <button onClick={handleAddSchedule}>추가</button>
        {schedule[selectedDate.toDateString()] && (
          <ul className="schedule-list">
            {schedule[selectedDate.toDateString()].map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default DashboardCalendar;
