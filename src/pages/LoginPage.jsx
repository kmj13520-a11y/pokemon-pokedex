// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
  const { login, error, setError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await login(email, password);
      navigate("/"); // 로그인 후 메인 페이지로
    } catch (err) {
      console.error(err);
      setError("이메일 또는 비밀번호를 다시 확인해주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="login-page">
      <div className="login-card">
        <h2 className="login-title">트레이너 로그인</h2>
        <p className="login-subtitle">
          포켓몬 도감에 접속하려면 트레이너 정보가 필요합니다.
          <br />
          등록된 이메일과 비밀번호를 입력해 주세요.
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label className="login-label">이메일</label>
            <input
              type="email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="trainer@example.com"
            />
          </div>

          <div className="login-field">
            <label className="login-label">비밀번호</label>
            <input
              type="password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" disabled={submitting} className="login-button">
            {submitting ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <p className="login-footer-text">
          아직 트레이너가 아니신가요?{" "}
          <Link to="/signup" className="login-link">
            회원가입 하기
          </Link>
        </p>
      </div>
    </section>
  );
}
