// src/context/FavoritesContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext(null);
const STORAGE_KEY = "pokedex_favorites";

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // 처음 렌더링 시 localStorage에서 불러오기
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        setFavorites(parsed);
      }
    } catch (e) {
      console.error("즐겨찾기 로딩 실패:", e);
    }
  }, []);

  // favorites 바뀔 때마다 localStorage에 저장
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error("즐겨찾기 저장 실패:", e);
    }
  }, [favorites]);

  const toggleFavorite = (pokemon) => {
    setFavorites((prev) => {
      const exists = prev.some((p) => p.id === pokemon.id);
      if (exists) {
        return prev.filter((p) => p.id !== pokemon.id);
      }
      return [...prev, pokemon];
    });
  };

  const isFavorite = (id) => favorites.some((p) => p.id === id);

  const clearFavorites = () => setFavorites([]);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite, clearFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error(
      "useFavorites는 FavoritesProvider 안에서만 사용할 수 있습니다."
    );
  }
  return ctx;
}
