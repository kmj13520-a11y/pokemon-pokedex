// src/context/TeamContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const TeamContext = createContext(null);
const STORAGE_KEY = "pokedex_team";

export function TeamProvider({ children }) {
  const [team, setTeam] = useState([]);

  // 초기 로드
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) setTeam(parsed);
    } catch (e) {
      console.error("팀 로딩 실패:", e);
    }
  }, []);

  // 변경 시 저장
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(team));
    } catch (e) {
      console.error("팀 저장 실패:", e);
    }
  }, [team]);

  // 팀 최대 6마리
  const addToTeam = (pokemon) => {
    if (team.length >= 6) return false; // ❗ 실패 반환
    if (team.some((p) => p.id === pokemon.id)) return true; // 이미 팀에 있음
    setTeam((prev) => [...prev, pokemon]);
    return true;
  };

  const removeFromTeam = (id) => {
    setTeam((prev) => prev.filter((p) => p.id !== id));
  };

  const isInTeam = (id) => team.some((p) => p.id === id);

  const clearTeam = () => setTeam([]);

  return (
    <TeamContext.Provider
      value={{ team, addToTeam, removeFromTeam, isInTeam, clearTeam }}
    >
      {children}
    </TeamContext.Provider>
  );
}

export function useTeam() {
  const ctx = useContext(TeamContext);
  if (!ctx) {
    throw new Error("useTeam은 TeamProvider 안에서 사용해야 합니다.");
  }
  return ctx;
}
