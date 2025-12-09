// src/pages/SignupPage.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./SignupPage.css";

export default function SignupPage() {
  const { signup, error, setError } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    deliveryAddress: "",
  });
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0] || null;
    setProfilePicFile(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
    } else {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await signup({ ...form, profilePicFile });
      navigate("/"); // 회원가입 후 메인으로
    } catch (err) {
      console.error(err);
      setError("회원가입에 실패했습니다. 입력값을 다시 확인해주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="signup-page">
      <div className="signup-card">
        <h2 className="signup-title">트레이너 등록</h2>
        <p className="signup-subtitle">
          포켓몬 도감 프로젝트에 참여할 트레이너 정보를 입력해 주세요.
          <br />
          프로필 이미지를 등록하면 도감 상단에서도 함께 표시됩니다.
        </p>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="signup-field">
            <label className="signup-label">이름</label>
            <input
              name="name"
              className="signup-input"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="트레이너 이름"
            />
          </div>

          <div className="signup-field">
            <label className="signup-label">이메일</label>
            <input
              type="email"
              name="email"
              className="signup-input"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="trainer@example.com"
            />
          </div>

          <div className="signup-field">
            <label className="signup-label">비밀번호</label>
            <input
              type="password"
              name="password"
              className="signup-input"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          <div className="signup-field">
            <label className="signup-label">배송지 / 주소</label>
            <input
              name="deliveryAddress"
              className="signup-input"
              value={form.deliveryAddress}
              onChange={handleChange}
              required
              placeholder="굿즈 배송을 받을 주소"
            />
          </div>

          <div className="signup-field">
            <label className="signup-label">프로필 사진 (선택)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="signup-file-input"
            />
            {previewUrl && (
              <div className="signup-preview">
                <p className="signup-preview-label">미리보기</p>
                <div className="signup-preview-frame">
                  <img
                    src={previewUrl}
                    alt="프로필 미리보기"
                    className="signup-preview-image"
                  />
                </div>
              </div>
            )}
          </div>

          {error && <p className="signup-error">{error}</p>}

          <button type="submit" disabled={submitting} className="signup-button">
            {submitting ? "회원가입 중..." : "회원가입"}
          </button>
        </form>

        <p className="signup-footer-text">
          이미 트레이너 계정이 있으신가요?{" "}
          <Link to="/login" className="signup-link">
            로그인하기
          </Link>
        </p>
      </div>
    </section>
  );
}
