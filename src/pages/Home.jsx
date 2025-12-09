// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <main className="home">
      {/* 상단 히어로 섹션 */}
      <section className="home-hero">
        <div className="home-hero-text">
          <p className="home-eyebrow">WEB POKÉDEX · GEN 1–9</p>

          <h1 className="home-title">1~9세대 전세대 포켓몬 도감</h1>

          <p className="home-description">
            Pokédex Explorer는 1세대부터 9세대까지 전 세대 포켓몬을 웹에서
            한눈에 탐색할 수 있는
            <br />
            포켓몬 도감 프로젝트입니다. 세대별 필터, 타입, 능력치, 이미지까지 한
            번에 확인하고,
            <br />
            앞으로는 팀 빌더, 즐겨찾기, 사용자의 플레이 스타일에 맞춘 확장
            기능도 추가할 예정입니다.
          </p>

          <div className="home-actions">
            <Link to="/pokedex" className="btn btn-primary home-main-btn">
              ▶ 전세대 포켓몬 도감 열기
            </Link>
          </div>

          <ul className="home-summary-list">
            <li>· 1~9세대 포켓몬 기본 정보 / 이미지 / ID 제공</li>
            <li>· 세대·이름·타입 기준 검색 및 필터링 구조</li>
            <li>· PokeAPI 기반 실시간 데이터 연동</li>
            <li>· 로그인/회원 기능과 연동해 팀 빌더·즐겨찾기 확장 가능</li>
          </ul>
        </div>

        {/* 오른쪽: 도감 화면 일러스트 느낌 */}
        <div className="home-hero-visual">
          <div className="home-pokedex-frame">
            <div className="home-pokedex-header">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
              <span className="header-title">Pokédex Explorer</span>
            </div>

            <div className="home-pokedex-body">
              <div className="home-pokedex-main">
                <div className="home-pokemon-chip">No.025 · Pikachu</div>
                <div className="home-pokemon-image">
                  <span className="emoji">⚡</span>
                </div>
              </div>
              <div className="home-pokedex-side">
                <div className="info-row">
                  <span className="label">타입</span>
                  <span className="value">전기</span>
                </div>
                <div className="info-row">
                  <span className="label">지원 세대</span>
                  <span className="value">1~9세대</span>
                </div>
                <div className="info-row">
                  <span className="label">도감 예시 ID</span>
                  <span className="value">#025</span>
                </div>
                <a
                  href="https://pokeapi.co"
                  target="_blank"
                  rel="noreferrer"
                  className="home-api-link"
                >
                  🔗 PokeAPI 문서 보기
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 하단 소개 섹션 */}
      <section className="home-sections">
        <article className="home-section-card">
          <h2>전세대 포켓몬 도감</h2>
          <p>
            1~9세대에 등장하는 포켓몬들을 세대별로 나누어 탐색할 수 있습니다.
            이름, 이미지, 타입, ID는 기본이고, 세대 필터를 통해 &quot;추억의
            1세대&quot;부터 &quot;최신 9세대&quot;까지 자유롭게 넘나들며 도감을
            살펴볼 수 있습니다.
          </p>
        </article>

        <article className="home-section-card">
          <h2>트레이너 중심 회원 시스템</h2>
          <p>
            로그인 / 회원가입 기능과 연동해 즐겨찾기, 나만의 파티 저장,
            마이페이지, 사용 기록 등 트레이너 중심 기능으로 자연스럽게 확장될 수
            있도록 설계되어 있습니다. 추후에는 전투용 팀 빌더나 추천 파티 기능도
            추가할 수 있습니다.
          </p>
        </article>

        <article className="home-section-card">
          <h2>확장 가능한 포트폴리오용 서비스</h2>
          <p>
            React + Node + MongoDB + 외부 API 구조로 구축된 프로젝트로, 단순한
            리스트 출력이 아닌 세대별 데이터 로딩, 필터링, 상태 관리 등을 경험할
            수 있습니다. 면접에서 &quot;실제 서비스 아키텍처&quot;와 &quot;API
            연동 기반 확장성&quot;을 설명하기 좋은 포트폴리오용 웹 서비스입니다.
          </p>
        </article>
      </section>
    </main>
  );
};

export default Home;
