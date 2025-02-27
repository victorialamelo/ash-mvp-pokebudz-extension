import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { jwtDecode, InvalidTokenError } from "jwt-decode"; // https://www.npmjs.com/package/jwt-decode

function AdoptedPokemonPage() {
  const [adoptedPokemons, setAdoptedPokemons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdoptedPokemons(); // fetch adopted Pokémon
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
      setAdoptedPokemons(data);
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
    <div className="Content">
      <h1>Adopted Pokémon</h1>

      <p>Hello, USER NAME!</p>

      {/* display adopted Pokémon */}
      {adoptedPokemons.length > 0 ? (
        <>
          {adoptedPokemons.map((pokemon) => (
            <div key={pokemon.id} className="pokemon-card">
              <h2>
                #{pokemon.pokemon_id} {pokemon.pokemon_name}
              </h2>
              <img
                style={{ width: "200px", aspectRatio: "1" }}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.pokemon_id}.gif`}
                alt={pokemon.pokemon_name}
              />
            </div>
          ))}
        </>
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
