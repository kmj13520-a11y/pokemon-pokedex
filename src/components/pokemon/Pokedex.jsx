// src/components/pokemon/Pokedex.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchGeneration } from "../../api/pokemon";
import GenerationButtons from "./GenerationButtons";
import { Link } from "react-router-dom";
import "./Pokedex.css";

// 🔹 세대 정보
const GEN_INFO = {
  1: "1세대 · 관동",
  2: "2세대 · 성도",
  3: "3세대 · 호연",
  4: "4세대 · 신오",
  5: "5세대 · 하나",
  6: "6세대 · 칼로스",
  7: "7세대 · 알로라",
  8: "8세대 · 가라르",
  9: "9세대 · 팔데아",
};

export default function Pokedex() {
  const [currentGen, setCurrentGen] = useState(1); // 기본 1세대
  const [pokemons, setPokemons] = useState([]); // ⭐ 세대별 포켓몬 리스트
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 세대가 바뀔 때마다 API 호출
  useEffect(() => {
    let ignore = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        // 1) 백엔드에서 세대별 포켓몬 기본 데이터 가져오기
        const data = await fetchGeneration(currentGen); // [{ id, name_en, image, types? }, ...]

        if (ignore || !Array.isArray(data)) {
          if (!ignore) setPokemons([]);
          return;
        }

        // 2) PokeAPI에서 한글 이름 가져오기 (상세페이지에서 하던 방식과 동일한 로직)
        const withKoreanNames = await Promise.all(
          data.map(async (p) => {
            try {
              const pokemonId = p.id;

              // species 엔드포인트에서 ko 이름 찾기
              const speciesRes = await axios.get(
                `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
              );
              const nameKO =
                speciesRes.data.names.find((n) => n.language.name === "ko")
                  ?.name ??
                p.name_en ??
                p.name;

              return {
                ...p,
                nameKo: nameKO, // 내 포켓몬 카드와 맞추기
                nameEn: p.name_en || p.name || "", // 영어 이름도 같이 저장
              };
            } catch (e) {
              console.error("한글 이름 로딩 실패:", e);
              return {
                ...p,
                nameKo: p.name_en || p.name || "이름 없음",
                nameEn: p.name_en || p.name || "",
              };
            }
          })
        );

        if (!ignore) {
          setPokemons(withKoreanNames);
        }
      } catch (err) {
        console.error(err);
        if (!ignore) {
          setError("포켓몬 데이터를 불러오는 중 오류가 발생했습니다.");
          setPokemons([]);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [currentGen]);

  return (
    <section className="pokedex">
      <header className="pokedex-header">
        <h1>포켓몬 도감</h1>
        <p className="pokedex-subtitle">
          {GEN_INFO[currentGen]
            ? `${GEN_INFO[currentGen]} 포켓몬을 둘러보세요.`
            : "세대를 선택해서 포켓몬을 둘러보세요."}
        </p>
      </header>

      {/* 세대 선택 버튼 영역 */}
      <GenerationButtons currentGen={currentGen} onChange={setCurrentGen} />

      {/* 상태 표시 */}
      {loading && <p className="pokedex-status">불러오는 중...</p>}
      {error && <p className="pokedex-status error">{error}</p>}

      {/* 포켓몬 리스트 */}
      <div className="my-grid">
        {!loading && !error && pokemons.length === 0 && (
          <p className="pokedex-status">
            이 세대에는 아직 포켓몬 데이터가 없습니다.
          </p>
        )}

        {!loading &&
          !error &&
          pokemons.map((p) => {
            const image = p.image || p.sprite || "";
            const nameKo = p.nameKo || p.name_kr || p.nameEn || p.name_en;
            const nameEn = p.nameEn || p.name_en || p.name || "";
            const types = Array.isArray(p.types) ? p.types : [];

            return (
              <div key={p.id} className="my-card">
                <Link to={`/pokemon/${p.id}`} className="my-card-main">
                  <div className="my-card-image-wrap">
                    {image ? (
                      <img
                        src={image}
                        alt={nameKo || nameEn}
                        className="my-card-image"
                      />
                    ) : (
                      <div className="pokemon-no-image">No Image</div>
                    )}
                  </div>

                  <div className="my-card-info">
                    <p className="my-id">No.{String(p.id).padStart(3, "0")}</p>
                    <h3 className="my-name">
                      {nameKo}{" "}
                      {nameEn && <span className="my-subname">({nameEn})</span>} 
                    </h3>

                    <div className="my-types">
                      {types.map((t) => (
                        <span key={t} className={`type-badge type-${t}`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </section>
  );
}
