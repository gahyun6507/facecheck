const mongoose = require('mongoose');

// 사용자 스키마 정의
const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true, // id는 고유해야 함
  },
  pw: {
    type: String,
    required: true, // 비밀번호는 필수
  },
  name: {
    type: String,
    required: true, // 이름은 필수
  },
});

// User 모델 정의
const User = mongoose.model('User', userSchema);

module.exports = User;
