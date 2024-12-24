// backend/models/Attendance.js
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  stdName: { type: String, required: true },
  stdNum: { type: String, required: true },
  attendance: { type: String, required: true }, 
  date: { type: Date, default: Date.now },
  subject: { type: String, required: true } // subject 필드 추가
});

// 컬렉션 이름을 명시적으로 지정
const Attendance = mongoose.model('Attendance', attendanceSchema, 'attendances');

module.exports = Attendance;
