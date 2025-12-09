// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  login as loginApi,
  signup as signupApi,
  getMe,
  logout as logoutApi,
} from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 자동 로그인 처리
  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }
        const me = await getMe();
        setUser(me);
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  const login = async (email, password) => {
    setError(null);
    await loginApi({ email, password });
    const me = await getMe();
    setUser(me);
  };

  /** ⭐ 수정 완료: 회원가입 시 FormData 구성 */
  const signup = async ({
    name,
    email,
    password,
    deliveryAddress,
    profilePicFile,
  }) => {
    setError(null);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("deliveryAddress", deliveryAddress);

    if (profilePicFile) {
      formData.append("profilePic", profilePicFile); // ⚠️ 백엔드 multer 이름과 일치해야 함!
    }

    await signupApi(formData); // 이제 JSON이 아니라 FormData 전달됨

    const me = await getMe();
    setUser(me);
  };

  const logout = () => {
    logoutApi();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        signup,
        logout,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
