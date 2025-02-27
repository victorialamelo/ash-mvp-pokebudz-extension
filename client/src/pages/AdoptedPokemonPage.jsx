import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { jwtDecode, InvalidTokenError } from "jwt-decode"; // https://www.npmjs.com/package/jwt-decode
import html2canvas from "html2canvas";

function AdoptedPokemonPage() {
  const [adoptedPokemon, setAdoptedPokemon] = useState(null); // Store the single adopted Pokémon
  const [pokemonDetails, setPokemonDetails] = useState(null); // Store Pokémon details
  const [userName, setUserName] = useState(""); // Store the user name
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdoptedPokemon(); // fetch adopted Pokémon and user name
  }, []);

  // fetch adopted Pokémon for the logged-in user_id and user name
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

      await fetchUserName(userId); // fetch user name

      const response = await fetch(`/api/userpokemon/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch adopted Pokémon");

      const data = await response.json();
      const pokemon = data[0]; // for now, assuming only one Pokémon will be displayed from the data array
      setAdoptedPokemon(pokemon);
      fetchPokemonDetails(pokemon.pokemon_id);
    } catch (error) {
      console.error("Error fetching adopted Pokémon:", error);
      alert("An error occurred while fetching your Pokémon.");
    }
  };

  // fetch user name using user_id
  const fetchUserName = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setUserName(data.name || "Unknown User"); // or...if name is null
    } catch (error) {
      console.error("Error fetching user name:", error);
      setUserName("Unknown User");
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

  // const downloadAdoptionCertificate = () => {
  //   navigator.share({
  //     url: "https://pokebudz-ash.com",
  //     title:
  //       "Check out my Poke Buddy! Want to find out yours? Visit Pokebudz and take the Quiz now ⚡",
  //   });
  // };

  const shareWithFriend = () => {
    navigator.share({
      url: "https://pokebudz-ash.com",
      title:
        "Check out my Poke Buddy! Want to find out yours? Visit Pokebudz and take the Quiz now ⚡",
    });
  };

  return (
    <div className="Content">
      <h1>Adopted Pokémon</h1>
      <p>Hello, {userName}!</p>
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
      {/* <button
        className="btn btn-danger mt-3"
        onClick={downloadAdoptionCertificate}
      >
        Download adoption certificate
      </button> */}
      <button className="btn btn-danger mt-3" onClick={shareWithFriend}>
        Share it with a friend!
      </button>
    </div>
  );
}

export default AdoptedPokemonPage;
