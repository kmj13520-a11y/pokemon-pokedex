// src/components/Navbar.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ user, logout }) {
  return (
    <header className="nav-header">
      <nav className="nav-inner">
        {/* 🔻 왼쪽: 로고 + 메뉴 */}
        <div className="nav-left">
          <Link to="/" className="nav-logo">
            포켓몬 탐험 도감
          </Link>

          <div className="nav-menu">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              홈
            </NavLink>

            <NavLink
              to="/pokedex"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              포켓몬 도감
            </NavLink>

            <NavLink
              to="/my-pokemon"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              내 포켓몬
            </NavLink>
          </div>
        </div>

        {/* 🔻 오른쪽: 로그인 / 회원가입 / 트레이너 정보 */}
        <div className="nav-right">
          {user ? (
            <>
              <span className="trainer-badge">
                <span className="trainer-label">트레이너</span>
                <span className="trainer-name">{user.name}</span>
              </span>

              <button className="btn-small btn-outline" onClick={logout}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-small btn-ghost">
                로그인
              </Link>
              <Link to="/signup" className="btn-small btn-primary">
                회원가입
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
