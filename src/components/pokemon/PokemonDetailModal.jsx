// src/components/pokemon/PokemonDetailModal.jsx
import { useEffect, useState } from "react";
import { fetchPokemonDetail } from "../../api/pokemon";
import { useNavigate } from "react-router-dom";

export default function PokemonDetailModal({ id, onClose }) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchPokemonDetail(id);
        setPokemon(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="modal-backdrop">
        <div className="modal">
          <p>불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!pokemon) return null;

  const goDetailPage = () => {
    onClose();
    navigate(`/pokemon/${pokemon.id}`);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <header className="modal-header">
          <div>
            <p>No.{pokemon.id.toString().padStart(3, "0")}</p>
            <h2>
              {pokemon.name_ko} / {pokemon.name_en}
            </h2>
            <div className="type-badges">
              {pokemon.types.map((type) => (
                <span key={type} className={`type-badge type-${type}`}>
                  {type}
                </span>
              ))}
            </div>
          </div>
          <img
            src={
              pokemon.sprites.official_artwork || pokemon.sprites.front_default
            }
            alt={pokemon.name_en}
            className="pokemon-art"
          />
        </header>

        <section className="modal-body">
          <div className="stats-section">
            <h3>기본 능력치</h3>
            <ul className="stats-list">
              {pokemon.stats.map((stat) => (
                <li key={stat.name} className="stat-item">
                  <span className="stat-name">{stat.name.toUpperCase()}</span>
                  <div className="stat-bar-wrapper">
                    <div
                      className="stat-bar"
                      style={{
                        width: `${Math.min((stat.base / 200) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <span className="stat-value">{stat.base}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="abilities-section">
            <h3>특성(Abilities)</h3>
            <ul>
              {pokemon.abilities.map((ab) => (
                <li key={ab.name}>
                  {ab.name}
                  {ab.isHidden && (
                    <span className="hidden-label"> (숨겨진 특성)</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="sprites-section">
            <h3>스프라이트</h3>
            <div className="sprites-row">
              <div>
                <p>일반</p>
                <img src={pokemon.sprites.front_default} alt="normal" />
              </div>
              <div>
                <p>색이 다른 버전</p>
                <img src={pokemon.sprites.front_shiny} alt="shiny" />
              </div>
            </div>
          </div>

          {pokemon.cries?.latest && (
            <div className="cries-section">
              <h3>울음소리</h3>
              <audio controls src={pokemon.cries.latest}>
                브라우저가 오디오 태그를 지원하지 않습니다.
              </audio>
            </div>
          )}
        </section>

        <footer className="modal-footer">
          <button onClick={goDetailPage}>상세 페이지로 이동</button>
        </footer>
      </div>
    </div>
  );
}
