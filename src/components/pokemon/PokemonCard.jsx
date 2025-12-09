// src/components/pokemon/PokemonCard.jsx
import { useNavigate } from "react-router-dom";
import "./PokemonCard.css";

export default function PokemonCard({ pokemon }) {
  const navigate = useNavigate();

  const image = pokemon.image || pokemon.sprite || "";

  const name = pokemon.name_kr || pokemon.name_en || "알 수 없음";

  const handleClick = () => {
    navigate(`/pokemon/${pokemon.id}`); // ⭐ 상세 페이지 이동
  };

  return (
    <article className="pokemon-card" onClick={handleClick}>
      <div className="pokemon-img-wrapper">
        {image ? (
          <img src={image} alt={name} className="pokemon-img" />
        ) : (
          <div className="pokemon-no-image">No Image</div>
        )}
      </div>

      <p className="pokemon-id">No.{pokemon.id?.toString().padStart(3, "0")}</p>
      <h3 className="pokemon-name">{name}</h3>
    </article>
  );
}
