import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import {
  hasSession,
  getCurrentSession,
  deleteCurrentSession,
} from "../session";
import {
  backendGetUser,
  backendGetUserPokemon,
  externalGetPokemonDetails,
} from "../backend";

function AdoptedPokemonPage() {
  const [adoptedPokemon, setAdoptedPokemon] = useState(null); // Store the single adopted Pokémon
  const [pokemonDetails, setPokemonDetails] = useState(null); // Store Pokémon details
  const [userName, setUserName] = useState(""); // Store the user name
  const navigate = useNavigate();

  useEffect(() => {
    if (hasSession()) {
      fetchAdoptedPokemon(getCurrentSession());
    } else {
      alert("You need to log in first!");
      navigate("/");
    }
  }, []);

  // fetch adopted Pokémon for the logged-in user_id and user name
  const fetchAdoptedPokemon = async ({ userId }) => {
    try {
      const { name } = await backendGetUser(userId);
      setUserName(name);

      const pokemon = await backendGetUserPokemon(userId);
      setAdoptedPokemon(pokemon);

      const details = await externalGetPokemonDetails(pokemon.pokemon_id);
      setPokemonDetails(details);
    } catch (error) {
      console.error("Error fetching adopted Pokémon:", error);
      alert("An error occurred while fetching your Pokémon.");
    }
  };

  // logout function
  const handleLogout = () => {
    deleteCurrentSession();
    navigate("/");
  };

  return (
    <div className="Content">
      <h1>Adopted Pokébud</h1>
      <p>Hello, {userName}!</p>
      <h3>
        Hear your Pokébud's unique cry and discover all about its
        characteristics and powers!
      </h3>
      {adoptedPokemon && pokemonDetails ? (
        <div className="pokemon-card">
          <h4 className="pokemon-name-details">
            #{pokemonDetails.id} {pokemonDetails.name}
          </h4>
          <img
            style={{ width: "140px", aspectRatio: "1" }}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemonDetails.id}.gif`}
            alt={pokemonDetails.name}
          />

          <audio
            controls
            style={{ colorScheme: "dark" }}
            src={`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemonDetails.id}.ogg`}
          ></audio>

          <div className="pokemon-details">
            <p>
              <strong>Name:</strong> {pokemonDetails.name}
            </p>
            <p>
              <strong>Type:</strong>{" "}
              {pokemonDetails.types.map((type) => type.type.name).join(", ")}
            </p>
            <p>
              <strong>Height:</strong> {pokemonDetails.height / 10} m
            </p>
            <p>
              <strong>Weight:</strong> {pokemonDetails.weight / 10} kg
            </p>

            <div>
              <strong>Moves:</strong>
              <ul>
                {pokemonDetails.moves.slice(0, 5).map((move) => (
                  <li key={move.move.name}>{move.move.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading Pokémon details...</p>
      )}
      <section>
        <Link to="./certificate">
          <button className="btn btn-danger mt-3">
            Pokébud Adoption Certificate
          </button>
        </Link>
      </section>
      <button className="btn btn-danger mt-3" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default AdoptedPokemonPage;
