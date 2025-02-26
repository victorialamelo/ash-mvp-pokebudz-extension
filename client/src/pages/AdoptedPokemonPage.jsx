import { useEffect, useState } from "react";
import { useNavigate } from "react-router"; // Import useParams
import { jwtDecode, InvalidTokenError } from "jwt-decode"; // https://www.npmjs.com/package/jwt-decode

function AdoptedPokemonPage() {
  const [adoptedPokemons, setAdoptedPokemons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdoptedPokemons(); // Fetch adopted Pokémon
  }, []);

  const fetchAdoptedPokemons = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You need to log in first!");
        navigate("/");
        return;
      }

      const tokenPayload = jwtDecode(token);

      const userId = tokenPayload.user_id;
      if (!userId) {
        throw new InvalidTokenError("token payload does not contain user_id");
      }

      const response = await fetch(`/api/userpokemon/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch adopted Pokémon");
      }

      const data = await response.json();
      setAdoptedPokemons(data); // No need to access `pokemons` since data directly contains the Pokémon list
    } catch (error) {
      console.error(error);

      if (error instanceof InvalidTokenError) {
        localStorage.removeItem("token");
        navigate("/");
        return;
      }
    }
  };

  // logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // removes token
    navigate("/"); // redirects user to the homepage
  };

  return (
    <div className="content">
      <h1>Adopted Pokémon</h1>

      {/* Display adopted Pokémon */}
      {adoptedPokemons.length > 0 ? (
        <div>
          {adoptedPokemons.map((pokemon) => (
            <div key={pokemon.id} className="pokemon-card">
              <img src={pokemon.pokemon_sprite} alt={pokemon.pokemon_name} />
              <h2>{pokemon.pokemon_name}</h2>
              <p>Status: {pokemon.status}</p>
              {/* Add more details as needed */}
            </div>
          ))}
        </div>
      ) : (
        <p>No adopted Pokémon found.</p>
      )}

      <button className="btn btn-danger mt-3" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default AdoptedPokemonPage;
