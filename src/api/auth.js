// src/api/auth.js
import api from "./apiClient";

// 회원가입 (프로필 사진까지 전송 가능)
export async function signup({
  name,
  email,
  password,
  deliveryAddress,
  profilePicFile,
}) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("deliveryAddress", deliveryAddress);
  if (profilePicFile) {
    formData.append("profilePic", profilePicFile); // 백엔드 multer에서 fieldname: profilePic
  }

  const res = await api.post("/user/signup", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  const { token } = res.data;
  localStorage.setItem("token", token);
  return token;
}

// 로그인
export async function login({ email, password }) {
  const res = await api.post("/user/login", { email, password });

  const { token } = res.data;
  localStorage.setItem("token", token);
  return token;
}

// 내 정보 가져오기
export async function getMe() {
  const res = await api.get("/user/me"); // x-auth-token은 interceptor가 자동 추가
  return res.data; // { _id, name, email, profilePic, isAdmin, ... }
}

// 로그아웃
export function logout() {
  localStorage.removeItem("token");
}
