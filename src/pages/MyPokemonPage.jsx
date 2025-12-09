// src/pages/MyPokemonPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MyPokemonPage.css";

export default function MyPokemonPage() {
  const [myPokemons, setMyPokemons] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("myPokemons") || "[]");
    setMyPokemons(stored);
  }, []);

  const handleRemove = (id) => {
    const next = myPokemons.filter((p) => p.id !== id);
    setMyPokemons(next);
    localStorage.setItem("myPokemons", JSON.stringify(next));
  };

  if (myPokemons.length === 0) {
    return (
      <section className="my-pokemon">
        <h1 className="my-title">내 포켓몬</h1>
        <p className="my-empty">
          아직 추가된 포켓몬이 없습니다.
          <br />
          도감에서 마음에 드는 포켓몬을 &quot;내 포켓몬에 추가&quot; 해보세요!
        </p>
        <Link to="/pokedex" className="btn btn-primary">
          ← 도감으로 가기
        </Link>
      </section>
    );
  }

  return (
    <section className="my-pokemon">
      <h1 className="my-title">내 포켓몬</h1>
      <p className="my-subtitle">
        내가 담아둔 포켓몬 목록입니다. 카드를 클릭하면 상세 정보를 다시 볼 수
        있습니다.
      </p>

      <div className="my-grid">
        {myPokemons.map((p) => (
          <div key={p.id} className="my-card">
            <Link to={`/pokemon/${p.id}`} className="my-card-main">
              <div className="my-card-image-wrap">
                <img src={p.image} alt={p.nameKo} className="my-card-image" />
              </div>
              <div className="my-card-info">
                <p className="my-id">No.{String(p.id).padStart(3, "0")}</p>
                <h3 className="my-name">
                  {p.nameKo} <span className="my-subname">({p.nameEn})</span>
                </h3>
                <div className="my-types">
                  {p.types.map((t) => (
                    <span key={t} className={`type-badge type-${t}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>

            <button
              className="btn btn-outline my-remove-btn"
              onClick={() => handleRemove(p.id)}
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
