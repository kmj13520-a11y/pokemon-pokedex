// src/pages/PokemonDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PokemonDetailPage.css";

// 영문 stat 이름 → 한글 매핑
const STAT_NAME_KO = {
  hp: "HP",
  attack: "공격",
  defense: "방어",
  "special-attack": "특수공격",
  "special-defense": "특수방어",
  speed: "스피드",
};

export default function PokemonDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [koreanName, setKoreanName] = useState("");
  const [loading, setLoading] = useState(true);
  const [isInMyList, setIsInMyList] = useState(false);

  // 포켓몬 정보 로드
  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

        const speciesRes = await axios.get(res.data.species.url);
        const nameKO =
          speciesRes.data.names.find((n) => n.language.name === "ko")?.name ??
          res.data.name;

        setPokemon(res.data);
        setKoreanName(nameKO);
      } catch (e) {
        console.error("상세 데이터 로딩 실패:", e);
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, [id]);

  // localStorage에 이미 들어있는지 확인
  useEffect(() => {
    if (!pokemon) return;
    const stored = JSON.parse(localStorage.getItem("myPokemons") || "[]");
    const exists = stored.some((p) => p.id === pokemon.id);
    setIsInMyList(exists);
  }, [pokemon]);

  const handleAddMyPokemon = () => {
    if (!pokemon) return;
    const stored = JSON.parse(localStorage.getItem("myPokemons") || "[]");

    if (stored.some((p) => p.id === pokemon.id)) {
      setIsInMyList(true);
      return;
    }

    const newEntry = {
      id: pokemon.id,
      nameKo: koreanName,
      nameEn: pokemon.name,
      image:
        pokemon.sprites.other["official-artwork"].front_default ||
        pokemon.sprites.front_default,
      types: pokemon.types.map((t) => t.type.name),
    };

    const next = [...stored, newEntry];
    localStorage.setItem("myPokemons", JSON.stringify(next));
    setIsInMyList(true);
    alert("내 포켓몬에 추가했습니다!");
  };

  const handleGoMyPokemon = () => {
    navigate("/my-pokemon");
  };

  if (loading) {
    return (
      <section className="pokemon-detail loading">
        <p>도감 기록을 불러오는 중입니다...</p>
      </section>
    );
  }

  if (!pokemon) {
    return (
      <section className="pokemon-detail">
        <p>포켓몬 정보를 불러올 수 없습니다.</p>
      </section>
    );
  }

  const maxStat = Math.max(...pokemon.stats.map((s) => s.base_stat));

  return (
    <section className="pokemon-detail">
      <header className="detail-header">
        <div>
          <p className="detail-eyebrow">POKÉDEX ENTRY · GEN 1</p>
          <h1 className="detail-title">
            #{String(pokemon.id).padStart(3, "0")} {koreanName}{" "}
            <span className="detail-subname">({pokemon.name})</span>
          </h1>
          <p className="detail-id-text">
            도감 번호: {pokemon.id} · 세대: 1세대 (Kanto)
          </p>
        </div>

        {/* 오른쪽: 뒤로가기 + 내 포켓몬 버튼 */}
        <div className="detail-header-actions">
          <Link to="/pokedex" className="btn btn-outline detail-back-btn">
            ← 도감으로 돌아가기
          </Link>
        </div>
      </header>

      <div className="detail-layout">
        {/* 왼쪽: 이미지 + 기본 정보 */}
        <div className="detail-left">
          <div className="detail-art-card">
            <div className="detail-art-inner">
              <img
                src={
                  pokemon.sprites.other["official-artwork"].front_default ||
                  pokemon.sprites.front_default
                }
                alt={pokemon.name}
                className="detail-art-image"
              />
            </div>
          </div>

          <div className="detail-basic-card">
            <h2 className="detail-section-title">기본 정보</h2>

            <div className="detail-row">
              <span className="detail-label">타입</span>
              <div className="detail-type-list">
                {pokemon.types.map((t) => (
                  <span
                    key={t.type.name}
                    className={`type-badge type-${t.type.name}`}
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="detail-row">
              <span className="detail-label">키</span>
              <span className="detail-value">{pokemon.height / 10} m</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">몸무게</span>
              <span className="detail-value">{pokemon.weight / 10} kg</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">특성</span>
              <div className="detail-ability-list">
                {pokemon.abilities.map((a) => (
                  <span key={a.ability.name} className="detail-ability">
                    {a.ability.name}
                    {a.is_hidden && (
                      <span className="ability-tag">숨겨진 특성</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: 능력치 그래프 + 메모 */}
        <div className="detail-right">
          <div className="detail-stats-card">
            <h2 className="detail-section-title">기본 능력치</h2>

            <div className="detail-stats-list">
              {pokemon.stats.map((s) => {
                const key = s.stat.name;
                const koLabel = STAT_NAME_KO[key] || key;
                const ratio = (s.base_stat / maxStat) * 100;

                return (
                  <div key={key} className="stat-row">
                    <div className="stat-label-wrap">
                      <span className="stat-name">{koLabel}</span>
                      <span className="stat-value">{s.base_stat}</span>
                    </div>
                    <div className={`stat-bar stat-${key}`}>
                      <div
                        className="stat-bar-fill"
                        style={{ width: `${ratio}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="detail-note-card">
            <h2 className="detail-section-title">도감 메모</h2>
            <p className="detail-note-text">
              이 페이지는 PokeAPI에서 가져온 데이터를 기반으로 구성된 웹 도감
              기록입니다. 마음에 드는 포켓몬을 &ldquo;내 포켓몬&rdquo;에
              모아두고, 나중에는 팀 빌더나 타입 상성 분석으로 확장할 수
              있습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
