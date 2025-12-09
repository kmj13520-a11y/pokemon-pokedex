// src/pages/MyTeamPage.jsx
import { Link } from "react-router-dom";
import { useTeam } from "../context/TeamContext";
import "../components/pokemon/Pokedex.css";

export default function MyTeamPage() {
  const { team, removeFromTeam, clearTeam } = useTeam();

  return (
    <section className="pokedex">
      <header className="pokedex-header">
        <h1>나만의 포켓몬 팀</h1>
        <p className="pokedex-subtitle">최대 6마리로 구성된 파티입니다.</p>
      </header>

      {team.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 10,
          }}
        >
          <button className="btn-small btn-outline" onClick={clearTeam}>
            팀 전체 초기화
          </button>
        </div>
      )}

      <div className="my-grid">
        {team.length === 0 ? (
          <p className="pokedex-status">팀에 추가된 포켓몬이 없습니다.</p>
        ) : (
          team.map((p) => (
            <div key={p.id} className="my-card">
              <button
                className="team-remove-btn"
                onClick={() => removeFromTeam(p.id)}
              >
                ×
              </button>

              <Link to={`/pokemon/${p.id}`} className="my-card-main">
                <div className="my-card-image-wrap">
                  <img src={p.image} className="my-card-image" />
                </div>

                <div className="my-card-info">
                  <p className="my-id">No.{String(p.id).padStart(3, "0")}</p>
                  <h3 className="my-name">{p.nameKo}</h3>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
