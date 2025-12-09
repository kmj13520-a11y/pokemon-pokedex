// src/components/Navbar.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="nav-header">
      <nav className="nav-inner">
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
              to="/favorites"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              즐겨찾기
            </NavLink>
            <NavLink
              to="/my-team"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              나만의 팀
            </NavLink>
          </div>
        </div>

        <div className="nav-right">
          <span className="nav-info">
            Powered by <strong>PokeAPI</strong>
          </span>
        </div>
      </nav>
    </header>
  );
}
