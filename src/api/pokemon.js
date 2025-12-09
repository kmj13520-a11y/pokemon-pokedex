// src/api/pokemon.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // 필요하면 .env로 분리 가능
});

// -------------------------------------------------------------------
// 📌 기본 포켓몬 리스트 (limit, page)
// -------------------------------------------------------------------
export const fetchPokemonList = async (page = 1, limit = 20) => {
  const { data } = await api.get("/pokemon", { params: { page, limit } });
  return data;
};

// -------------------------------------------------------------------
// 📌 개별 포켓몬 상세 정보
// -------------------------------------------------------------------
export const fetchPokemonDetail = async (id) => {
  const { data } = await api.get(`/pokemon/${id}`);
  return data;
};

// -------------------------------------------------------------------
// ⭐ NEW: 세대별 포켓몬 리스트 (1~9세대 전체 지원)
// 백엔드 라우터: GET /pokemon/generation/:gen  가정
// -------------------------------------------------------------------
export const fetchGeneration = async (gen) => {
  const { data } = await api.get(`/pokemon/generation/${gen}`);
  return data.pokemons; // [{ id, name, image, ... }]
};

// -------------------------------------------------------------------
// ⭐ 편의 함수 자동생성: fetchGen1() ~ fetchGen9()
// -------------------------------------------------------------------
export const fetchGen1 = () => fetchGeneration(1);
export const fetchGen2 = () => fetchGeneration(2);
export const fetchGen3 = () => fetchGeneration(3);
export const fetchGen4 = () => fetchGeneration(4);
export const fetchGen5 = () => fetchGeneration(5);
export const fetchGen6 = () => fetchGeneration(6);
export const fetchGen7 = () => fetchGeneration(7);
export const fetchGen8 = () => fetchGeneration(8);
export const fetchGen9 = () => fetchGeneration(9);
