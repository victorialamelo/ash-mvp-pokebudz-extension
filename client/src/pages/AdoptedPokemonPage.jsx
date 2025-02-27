import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { jwtDecode, InvalidTokenError } from "jwt-decode"; // https://www.npmjs.com/package/jwt-decode

function AdoptedPokemonPage() {
  const [adoptedPokemon, setAdoptedPokemon] = useState(null); // Store the single adopted Pokémon
  const [pokemonDetails, setPokemonDetails] = useState(null); // Store Pokémon details
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdoptedPokemon(); // fetch adopted Pokémon
  }, []);

  // fetch adopted Pokémon for the logged in user_id
  const fetchAdoptedPokemon = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You need to log in first!");
        navigate("/");
        return;
      }

      const tokenPayload = jwtDecode(token);
      const userId = tokenPayload.user_id;
      if (!userId)
        throw new InvalidTokenError("Invalid token: user_id missing");

      const response = await fetch(`/api/userpokemon/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch adopted Pokémon");

      const data = await response.json();
      const pokemon = data[0]; // for now, assuming one Pokémon will be displayed on the data array
      setAdoptedPokemon(pokemon);
      fetchPokemonDetails(pokemon.pokemon_id);
    } catch (error) {
      console.error("Error fetching adopted Pokémon:", error);
      alert("An error occurred while fetching your Pokémon.");
    }
  };

  // fetch Pokémon details from PokeAPI website
  const fetchPokemonDetails = async (pokemonId) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );
      if (!response.ok) throw new Error("Failed to load Pokémon details");

      const data = await response.json();
      setPokemonDetails(data);
    } catch (error) {
      console.error("Error loading Pokémon details:", error);
      alert("Sorry, we could not load your Pokémon details this time.");
    }
  };

  // logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="Content">
      <h1>Adopted Pokémon</h1>
      <p>Hello, USER NAME!</p>

      {adoptedPokemon && pokemonDetails ? (
        <div className="pokemon-card">
          <h2>
            #{pokemonDetails.id} {pokemonDetails.name}
          </h2>
          <img
            style={{ width: "150px", aspectRatio: "1" }}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemonDetails.id}.gif`}
            alt={pokemonDetails.name}
          />
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

      <button className="btn btn-danger mt-3" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default AdoptedPokemonPage;
