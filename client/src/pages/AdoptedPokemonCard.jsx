import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"; // Import useParams
// import jwt_decode from "jwt-decode"; // Import the jwt-decode library

function AdoptedPokemonCard() {
  const [adoptedPokemons, setAdoptedPokemons] = useState([]);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const { userId } = useParams(); // Get userId from the URL

  useEffect(() => {
    if (userId) {
      fetchAdoptedPokemons(userId); // Fetch adopted Pokémon for the given userId
    }
  }, [userId]);

  const fetchAdoptedPokemons = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You need to log in first!");
        navigate("/");
        return;
      }

      // Optionally decode token to verify the user, if needed
      // const decodedToken = jwt_decode(token);
      // const userIdFromToken = decodedToken.user_id;

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
      console.error("Error fetching adopted Pokémon:", error);
    }
  };

  // logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // removes token
    navigate("/"); // redirects user to the homepage
  };

  const requestData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token available");
      }

      const response = await fetch("/api/auth/profile", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
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
      <div className="text-center p-4">
        <button className=" btn btn-outline-primary" onClick={requestData}>
          Request protected data
        </button>
      </div>

      {profile && (
        <div className="text-center p-4">
          <div className="alert">{profile.message}</div>
        </div>
      )}
      <button className="btn btn-danger mt-3" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default AdoptedPokemonCard;
