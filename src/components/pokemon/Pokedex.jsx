// src/components/pokemon/Pokedex.jsx
import { useEffect, useState } from "react";
import { fetchGeneration } from "../../api/pokemon";
import GenerationButtons from "./GenerationButtons";
import { Link } from "react-router-dom";
import "./Pokedex.css";
import { useFavorites } from "../../context/FavoritesContext";
import { useTeam } from "../../context/TeamContext";

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

// 한 페이지에 보여줄 카드 수
const PAGE_SIZE = 24;

export default function Pokedex() {
  const [currentGen, setCurrentGen] = useState(1);
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ⭐ 페이징 상태
  const [currentPage, setCurrentPage] = useState(1);

  // ⭐ 즐겨찾기 기능
  const { toggleFavorite, isFavorite } = useFavorites();

  // ⭐ 팀 기능
  const { addToTeam, removeFromTeam, isInTeam } = useTeam();

  // 세대 변경 시 API 호출
  useEffect(() => {
    let ignore = false;

    async function load() {
      setLoading(true);
      setError(null);
      setCurrentPage(1); // 🔹 세대 바뀔 때 페이지를 항상 1페이지로 리셋

      try {
        const data = await fetchGeneration(currentGen);

        if (ignore || !Array.isArray(data)) {
          if (!ignore) setPokemons([]);
          return;
        }

        // 한글 이름 붙이기
        const withKoreanNames = await Promise.all(
          data.map(async (p) => {
            try {
              const res = await fetch(
                `https://pokeapi.co/api/v2/pokemon-species/${p.id}`
              );
              if (!res.ok) throw new Error("species 요청 실패");
              const species = await res.json();

              const nameKo =
                species.names.find((n) => n.language.name === "ko")?.name ??
                p.name;

              return {
                ...p,
                nameKo,
                nameEn: p.name,
              };
            } catch (e) {
              console.error("한글 이름 로딩 실패:", e);
              return {
                ...p,
                nameKo: p.name,
                nameEn: p.name,
              };
            }
          })
        );

        if (!ignore) setPokemons(withKoreanNames);
      } catch (err) {
        console.error(err);
        if (!ignore) {
          setError("포켓몬 데이터를 불러오는 중 오류가 발생했습니다.");
          setPokemons([]);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [currentGen]);

  // 🔢 페이징 계산
  const totalCount = pokemons.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const clampedPage = Math.min(currentPage, totalPages);
  const startIndex = (clampedPage - 1) * PAGE_SIZE;
  const pageItems = pokemons.slice(startIndex, startIndex + PAGE_SIZE);

  const goToPage = (page) => {
    const next = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 페이지 번호 리스트 (현재 페이지 기준 ±2)
  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, clampedPage - 2);
    const end = Math.min(totalPages, clampedPage + 2);
    for (let p = start; p <= end; p++) pages.push(p);
    return pages;
  };

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

      <GenerationButtons currentGen={currentGen} onChange={setCurrentGen} />

      {loading && <p className="pokedex-status">불러오는 중...</p>}
      {error && <p className="pokedex-status error">{error}</p>}

      <div className="my-grid">
        {!loading && !error && pageItems.length === 0 && (
          <p className="pokedex-status">이 세대의 포켓몬 데이터가 없습니다.</p>
        )}

        {!loading &&
          !error &&
          pageItems.map((p) => {
            const image = p.image || p.sprite || "";
            const nameKo = p.nameKo || p.nameEn;
            const nameEn = p.nameEn;
            const types = Array.isArray(p.types) ? p.types : [];

            // ⭐ 즐겨찾기 상태
            const isFav = isFavorite(p.id);

            // 🔥 팀 상태
            const inTeam = isInTeam(p.id);

            // 로컬 저장에 넣을 최소 데이터
            const cleanData = {
              id: p.id,
              nameKo,
              nameEn,
              image,
              types,
            };

            return (
              <div key={p.id} className="my-card">
                {/* ⭐ 즐겨찾기 버튼 */}
                <button
                  className={`favorite-btn ${isFav ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFavorite(cleanData);
                  }}
                >
                  {isFav ? "★" : "☆"}
                </button>

                {/* 🔥 팀 추가/제거 버튼 */}
                <button
                  className={`team-btn ${inTeam ? "in-team" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (inTeam) {
                      removeFromTeam(p.id);
                    } else {
                      const ok = addToTeam(cleanData);
                      if (!ok) {
                        alert("팀은 최대 6마리까지 가능합니다!");
                      }
                    }
                  }}
                >
                  {inTeam ? "✓ 팀 구성됨" : "+ 팀 추가"}
                </button>

                {/* 카드 전체 링크 */}
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
                      {nameKo} {nameEn && <span className="my-subname"></span>}
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

      {/* 🔻 페이지네이션 영역 */}
      {!loading && !error && totalPages > 1 && (
        <div className="pagination">
          <button
            className="page-btn"
            onClick={() => goToPage(1)}
            disabled={clampedPage === 1}
          >
            « 처음
          </button>
          <button
            className="page-btn"
            onClick={() => goToPage(clampedPage - 1)}
            disabled={clampedPage === 1}
          >
            ‹ 이전
          </button>

          {getPageNumbers().map((p) => (
            <button
              key={p}
              className={`page-btn number ${p === clampedPage ? "active" : ""}`}
              onClick={() => goToPage(p)}
            >
              {p}
            </button>
          ))}

          <button
            className="page-btn"
            onClick={() => goToPage(clampedPage + 1)}
            disabled={clampedPage === totalPages}
          >
            다음 ›
          </button>
          <button
            className="page-btn"
            onClick={() => goToPage(totalPages)}
            disabled={clampedPage === totalPages}
          >
            끝 »
          </button>

          <span className="page-info">
            페이지 {clampedPage} / {totalPages} · 총 {totalCount}마리
          </span>
        </div>
      )}
    </section>
  );
}
