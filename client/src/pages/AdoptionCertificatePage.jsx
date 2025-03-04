import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { hasSession, getCurrentSession } from "../session";
import {
  backendGetUser,
  backendGetUserPokemon,
  externalGetPokemonDetails,
} from "../backend";

import "../Certificate.css"; // CSS in separate file

function AdoptedCertificatePage() {
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

    // event listener for color picker
    const colorInput = document.getElementById("bg-color");
    colorInput.addEventListener("input", handleColorChange);

    return () => {
      colorInput.removeEventListener("input", handleColorChange);
    };
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

  const handleColorChange = (event) => {
    const newColor = event.target.value;
    document.querySelector(".certificate-content").style.backgroundColor =
      newColor;
    document.querySelector("header").style.color = newColor;
  };

  return (
    <div className="certificate-container">
      <div className="header-container">
        <img
          className="pokeball-img"
          src={`https://i.pinimg.com/236x/f6/93/f2/f693f22c35a0e2d91e2e22389a36ed5b.jpg`}
          alt="pokeball-img"
          style={{ width: "70px" }}
        />
        <header>Pokémon Adoption Certificate</header>
        <img
          className="pokeball-img"
          src={`https://i.pinimg.com/236x/f6/93/f2/f693f22c35a0e2d91e2e22389a36ed5b.jpg`}
          alt="pokeball-img"
          style={{ width: "70px" }}
        />
      </div>

      <div className="hidden-print color-selector">
        <label htmlFor="bg-color">Choose Background Color:</label>
        <input type="color" id="bg-color" name="bg-color" />
      </div>

      <div className="certificate-content">
        Your unique personality and lifestyle have made a perfect match with
        this amazing Pokémon. <br /> <br /> This certificate proudly
        acknowledges that {userName} has officially adopted:
        {adoptedPokemon && pokemonDetails ? (
          <div>
            <h4>{pokemonDetails.name}</h4>
            <img
              className="pokemon-certificate-img"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonDetails.id}.png`}
              alt={pokemonDetails.name}
            />
            <div className="certificate-info">
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
            </div>
          </div>
        ) : (
          <p>Loading Pokémon details...</p>
        )}
      </div>

      <footer>Congratulations on your new Pokébud!</footer>

      <button
        className="hidden-print btn btn-danger mt-3"
        onClick={() => window.print()}
      >
        {" "}
        Share with a friend!
      </button>
      <section className="buttons-position-center">
        <Link to="/userpokemon">
          <button className="hidden-print btn btn-danger mt-3">Back</button>
        </Link>
      </section>
    </div>
  );
}

export default AdoptedCertificatePage;
