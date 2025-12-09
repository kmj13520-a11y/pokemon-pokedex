// src/api/pokemon.js

// ------------------------------
// PokeAPI 기본 URL
// ------------------------------
const POKEAPI_BASE = "https://pokeapi.co/api/v2";

// 세대 API에서 species URL로부터 ID 추출
const extractId = (url) => {
  const parts = url.split("/").filter(Boolean);
  return Number(parts[parts.length - 1]);
};

// ==============================
// 📌 단일 포켓몬 상세 정보
// ==============================
export async function fetchPokemonDetail(idOrName) {
  const res = await fetch(`${POKEAPI_BASE}/pokemon/${idOrName}`);
  if (!res.ok) throw new Error("포켓몬 상세 정보를 불러오지 못했습니다.");

  const data = await res.json();

  return {
    id: data.id,
    name: data.name,
    image:
      data.sprites.other?.["official-artwork"]?.front_default ??
      data.sprites.front_default ??
      "",
    types: data.types.map((t) => t.type.name),
    height: data.height,
    weight: data.weight,
    stats: data.stats.map((s) => ({
      name: s.stat.name,
      value: s.base_stat,
    })),
  };
}

// ==============================
// 📌 포켓몬 리스트 (limit/page)
// ==============================
export async function fetchPokemonList(page = 1, limit = 20) {
  const offset = (page - 1) * limit;

  const res = await fetch(
    `${POKEAPI_BASE}/pokemon?offset=${offset}&limit=${limit}`
  );
  if (!res.ok) throw new Error("포켓몬 리스트를 불러오지 못했습니다.");
  const data = await res.json();

  // 상세 이미지/타입 불러와서 확장
  const enhanced = await Promise.all(
    data.results.map(async (item) => {
      const detailRes = await fetch(item.url);
      const detail = await detailRes.json();

      return {
        id: detail.id,
        name: detail.name,
        image:
          detail.sprites.other?.["official-artwork"]?.front_default ??
          detail.sprites.front_default ??
          "",
        types: detail.types.map((t) => t.type.name),
      };
    })
  );

  return enhanced;
}

// ==============================
// 📌 세대별 포켓몬 목록 (1~9세대 전체 지원)
// ==============================
export async function fetchGeneration(gen) {
  const res = await fetch(`${POKEAPI_BASE}/generation/${gen}`);
  if (!res.ok) throw new Error("세대 정보를 불러오지 못했습니다.");
  const data = await res.json();

  // species 목록에서 ID 뽑기
  const ordered = data.pokemon_species
    .map((s) => ({ id: extractId(s.url), name: s.name }))
    .sort((a, b) => a.id - b.id);

  // 각 포켓몬 상세 정보 가져오기
  const pokemons = await Promise.all(
    ordered.map(async (item) => {
      const detailRes = await fetch(`${POKEAPI_BASE}/pokemon/${item.id}`);
      const detail = await detailRes.json();

      return {
        id: detail.id,
        name: detail.name,
        image:
          detail.sprites.other?.["official-artwork"]?.front_default ??
          detail.sprites.front_default ??
          "",
        types: detail.types.map((t) => t.type.name),
      };
    })
  );

  return pokemons;
}

// ==============================
// 📌 세대별 헬퍼 함수
// ==============================
export const fetchGen1 = () => fetchGeneration(1);
export const fetchGen2 = () => fetchGeneration(2);
export const fetchGen3 = () => fetchGeneration(3);
export const fetchGen4 = () => fetchGeneration(4);
export const fetchGen5 = () => fetchGeneration(5);
export const fetchGen6 = () => fetchGeneration(6);
export const fetchGen7 = () => fetchGeneration(7);
export const fetchGen8 = () => fetchGeneration(8);
export const fetchGen9 = () => fetchGeneration(9);
