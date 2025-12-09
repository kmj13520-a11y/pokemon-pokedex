// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import "./App.css";

// 네비게이션
import Navbar from "./components/Navbar";

// 페이지들
import Home from "./pages/Home";
import Pokedex from "./components/pokemon/Pokedex";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PokemonListPage from "./pages/PokemonListPage";
import PokemonDetailPage from "./pages/PokemonDetailPage";
import MyPokemonPage from "./pages/MyPokemonPage";

export default function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="app-loading">
        <div className="pokeball" />
        <p>트레이너 정보를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="app">
      {/* 🔥 기존 헤더 제거하고 Navbar.jsx만 사용 */}
      <Navbar />

      <main className="app-main">
        <div className="app-main-inner">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/pokemon" element={<PokemonListPage />} />
            <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
            <Route path="/my-pokemon" element={<MyPokemonPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </div>
      </main>

      <footer className="app-footer">
        <p>
          © {new Date().getFullYear()} Pokédex Explorer · Powered by PokeAPI
        </p>
      </footer>
    </div>
  );
}
