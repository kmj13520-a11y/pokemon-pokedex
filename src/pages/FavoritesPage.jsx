// src/pages/FavoritesPage.jsx
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import "./FavoritesPage.css"; // 없으면 나중에 만들어도 됨
import "../components/pokemon/Pokedex.css"; // my-grid, my-card 스타일 재사용

export default function FavoritesPage() {
  const { favorites, clearFavorites } = useFavorites();

  return (
    <section className="pokedex">
      <header className="pokedex-header">
        <h1>즐겨찾기 포켓몬</h1>
        <p className="pokedex-subtitle">
          자주 찾는 포켓몬을 한 곳에서 모아볼 수 있어요.
        </p>
      </header>

      {favorites.length > 0 && (
        <div className="favorites-actions">
          <button className="btn-small btn-outline" onClick={clearFavorites}>
            즐겨찾기 전체 삭제
          </button>
        </div>
      )}

      <div className="my-grid">
        {favorites.length === 0 ? (
          <p className="pokedex-status">
            아직 즐겨찾기한 포켓몬이 없습니다. 도감에서 ⭐ 버튼을 눌러
            추가해보세요!
          </p>
        ) : (
          favorites.map((p) => (
            <div key={p.id} className="my-card">
              <Link to={`/pokemon/${p.id}`} className="my-card-main">
                <div className="my-card-image-wrap">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.nameKo || p.nameEn || p.name}
                      className="my-card-image"
                    />
                  ) : (
                    <div className="pokemon-no-image">No Image</div>
                  )}
                </div>
                <div className="my-card-info">
                  <p className="my-id">No.{String(p.id).padStart(3, "0")}</p>
                  <h3 className="my-name">
                    {p.nameKo || p.nameEn || p.name}{" "}
                    {p.nameEn && (
                      <span className="my-subname">({p.nameEn})</span>
                    )}
                  </h3>
                  <div className="my-types">
                    {Array.isArray(p.types) &&
                      p.types.map((t) => (
                        <span key={t} className={`type-badge type-${t}`}>
                          {t}
                        </span>
                      ))}
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
