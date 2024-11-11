import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import '../styles/WebCam.css';

const WebcamComponent = () => {
  const webcamRef = useRef(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const videoConstraints = {
    width: 800,
    height: 600,
    facingMode: "user"
  };

  const handleCapture = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) {
        setUploadStatus("웹캠에서 이미지를 캡처할 수 없습니다.");
        return;
      }

      const base64Image = imageSrc.split(',')[1];

      const data = {
        filename: "attendance_image.png",
        image_binary: base64Image,
      };

      try {
        const response = await axios.post("http://3.139.212.113:8000/upload/", data);
        
        const responseData = response.data;
        if (responseData.label === 'Unknown') {
          setUploadStatus("인식된 사용자: Unknown");
        } else {
          setUploadStatus(`인식된 사용자: ${responseData.label}`);
        }
      } catch (error) {
        setUploadStatus("업로드 실패: " + error.message);
      }
    } else {
      setUploadStatus("웹캠이 초기화되지 않았습니다.");
    }
  };

  return (
    <div className="webcam-container">
      <h3>출석 체크</h3>
      
      {/* Webcam Component */}
      <div className="webcam-box">
        <Webcam 
          audio={false}
          height={600}
          width={800}
          ref={webcamRef}
          videoConstraints={videoConstraints}
          screenshotFormat="image/jpeg"
        />
        <div className="black-border" /> {/* 검은선 추가 */}
      </div>

      {/* Capture and Check Attendance Button */}
      <button 
        className="webcam-toggle-button" 
        onClick={handleCapture}
      >
        출석 체크
      </button>

      {/* Display upload status */}
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default WebcamComponent;
