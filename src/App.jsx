// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import FavoritesPage from "./pages/FavoritesPage";
import MyTeamPage from "./pages/MyTeamPage";

import "./App.css";

// 네비게이션
import Navbar from "./components/Navbar";

// 페이지들
import Home from "./pages/Home";
import Pokedex from "./components/pokemon/Pokedex";
import PokemonListPage from "./pages/PokemonListPage";
import PokemonDetailPage from "./pages/PokemonDetailPage";

export default function App() {
  return (
    <div className="app">
      {/* 상단 네비게이션 */}
      <Navbar />

      <main className="app-main">
        <div className="app-main-inner">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/pokemon" element={<PokemonListPage />} />
            <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />{" "}
            <Route path="/my-team" element={<MyTeamPage />} />
            {/* ⭐ 추가 */}
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
