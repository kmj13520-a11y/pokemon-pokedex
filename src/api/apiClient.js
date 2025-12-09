// src/api/apiClient.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // 백엔드 주소
});

// 매 요청마다 localStorage의 토큰을 x-auth-token 헤더에 실어줌
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["x-auth-token"] = token; // 백엔드 auth 미들웨어에서 이 헤더 사용
  }
  return config;
});

export default api;
