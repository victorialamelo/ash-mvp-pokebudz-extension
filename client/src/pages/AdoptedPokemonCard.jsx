import { useNavigate, Link } from "react-router";

function AdoptedPokemonCard() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>This is your adopted Pokebud!</h1>
    </div>
  );
}

export default AdoptedPokemonCard;
