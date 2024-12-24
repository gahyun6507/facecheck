require('dotenv').config(); // dotenv 설정

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const Attendance = require('./models/Attendance'); // Attendance 모델 가져오기
const User = require('./models/User'); // User 모델 임포트
const bcrypt = require('bcrypt');

const app = express();
const PORT = 8000;
app.use(cors());
app.use(express.json());

// 인증서 경로
//const options = {
//  cert: fs.readFileSync('/environment/ssl/certs/selfsigned.crt'),
//  key: fs.readFileSync('/environment/ssl/private/selfsigned.key')
//};
//========================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB에 연결되었습니다.'))
  .catch((error) => console.error('MongoDB 연결 실패:', error));


//=======================
// 로그인
app.post('/api/login', async (req, res) => {
  const { id, pw } = req.body;

  if (!id || !pw) {
    return res.status(400).json({ message: '아이디와 비밀번호를 입력해주세요.' });
  }

  try {
    // 사용자 정보 조회
    const user = await User.findOne({ id });

    if (!user) {
      return res.status(401).json({ message: '아이디 또는 비밀번호가 잘못되었습니다.' });
    }

    // 비밀번호 비교 (평문 비교)
    if (user.pw !== pw) {
      return res.status(401).json({ message: '아이디 또는 비밀번호가 잘못되었습니다.' });
    }

    // 로그인 성공
    res.status(200).json({ message: '로그인 성공' });
  } catch (error) {
    console.error('로그인 오류:', error);
    res.status(500).json({ message: '서버 오류' });
  }
});


//==================================================================
//전체 학생 명단 불러오는 api
app.get('/api/allattendance', async (req, res) => {
  try {
    const records = await Attendance.find();
    console.log('Records fetched from database:', records); // 로깅 추가
    res.json(records);
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    res.status(500).json({ message: 'Error fetching attendance records' });
  }
});

// 기존 subject 코드

// //과목에 따른 출석 데이터를 반환하는 API
// app.get('/api/attendance', async (req, res) => {
//   const { subject } = req.query; // 쿼리 파라미터에서 subject를 받아옴

//   try {
//     // subject가 제공되면, 해당 subject로 데이터를 필터링
//     const filter = subject ? { subject } : {}; // subject가 있으면 필터링 조건 추가

//     // 필터링된 데이터 가져오기
//     const attendanceData = await Attendance.find(filter);
//     res.json(attendanceData);
//   } catch (error) {
//     console.error('데이터를 가져오는 데 오류가 발생했습니다:', error);
//     res.status(500).send('서버 오류');
//   }
// });

// Server.js 수정 시작 (주현수) 24.11.14 10:47
// http://18.116.93.222:8000/api/attendance?date=2024-10-26   || 날짜 타겟 전체 DB 조회
// http://18.116.93.222:8000/api/attendance?subject=캡스톤    || 과목 타겟 DB 조회
// http://18.116.93.222:8000/api/attendance?date=2024-10-26&subject=캡스톤  ||  날짜, 과목 타겟 DB 조회

app.get('/api/attendance', async (req, res) => {
  const { subject, date } = req.query;
  
  try {
    const filter = {};
    if (subject) filter.subject = subject;

    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      filter.date = { $gte: startDate, $lt: endDate };
    }

    const attendanceData = await Attendance.find(filter);

    const uniqueData = attendanceData.reduce((acc, current) => {
      const duplicate = acc.find(
        item => item.stdName === current.stdName && item.stdNum === current.stdNum
      );
      if (!duplicate) acc.push(current);
      return acc;
    }, []);

    res.json(uniqueData);
  } catch (error) {
    console.error('데이터를 가져오는 데 오류가 발생했습니다:', error);
    res.status(500).send('서버 오류');
  }
});


app.post('/api/postdata', async (req, res) => {
    console.log("Received request body:", req.body); 
    try {
        const attendanceData = req.body; 
        const newAttendance = new Attendance(attendanceData); 
        await newAttendance.save(); 

        res.status(201).json({ message: 'Record saved successfully', data: newAttendance });
    } catch (error) {
        console.error('Error saving attendance:', error);
        res.status(500).json({ message: 'Error saving attendance', error: error.message });
    }
});

//===================================================================
app.get('/api/dashboard', async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    
    // 오늘의 출석 데이터 조회
    const attendanceRecords = await Attendance.find({ date: { $gte: startOfDay, $lte: endOfDay } });

    const totalAttendance = attendanceRecords.length; // 오늘의 출석 수
    const absentees = await Attendance.find({ attendance: '결석' }).countDocuments(); // 결석자 수
    const latecomers = await Attendance.find({ attendance: '지각' }).countDocuments(); // 지각자 수

    // 총 학생 수를 데이터베이스에서 가져오기
    const distinctStudents = await Attendance.distinct('stdNum'); // 유일한 학생 ID 가져오기
    const totalStudents = distinctStudents.length; // 유일한 학생 수
    const attendanceRate = totalStudents ? ((totalStudents - absentees) / totalStudents) * 100 : 0;

    // 최근 결석자 조회 (전체 데이터에서 결석자만 가져옴)
    const recentAbsentees = await Attendance.find({ attendance: '결석' })
      .sort({ date: -1 }) // 가장 최근 기록 우선
      .limit(5)
      .then(records => records.map(record => record.stdName));

    res.status(200).json({
      totalAttendance, // 오늘의 출석 수
      absentees, // 결석자 수
      latecomers, // 지각자 수
      attendanceRate: attendanceRate.toFixed(2), // 총 출석률
      recentAbsentees, // 최근 결석자
    });
  } catch (error) {
    console.error('대시보드 데이터 조회 중 오류:', error);
    res.status(500).json({ message: '대시보드 데이터를 불러오는 중 오류가 발생했습니다.' });
  }
});

//====================================================


// 서버 시작
app.listen(PORT, () => {
  console.log("11-")
  console.log(`Server is running on port ${PORT}`);
});
