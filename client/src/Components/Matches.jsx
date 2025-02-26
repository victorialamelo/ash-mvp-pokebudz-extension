import { useContext, useEffect, useState } from "react";
import { ReactTyped } from "react-typed";
import { QuizContext } from "../Helpers/Contexts";
import "../App.css";

export default function Matches() {
  const { name, matchingCriteria, matches, setMatches, setGameState } =
    useContext(QuizContext);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const habitat = matchingCriteria.pokemonHabitat;
  const shape = matchingCriteria.pokemonShape;
  const type = matchingCriteria.pokemonType;
  const zType = matchingCriteria.zodiacType;

  const capitilize = (word) => word.charAt(0).toUpperCase() + word.slice(1);
  console.log("MATCHES matching criteria", matchingCriteria);

  useEffect(() => {
    if (matches.length > 0) {
      console.log("MATCHES FETCHED FROM THE API");
      return;
    }

    const fetchPokemonMatches = async () => {
      try {
        setLoading(true);
        const responses = await Promise.all([
          fetch(`api/pokemon/pokemon-habitat/${habitat}`),
          fetch(`api/pokemon/pokemon-shape/${shape}`),
          fetch(`api/pokemon/pokemon-type/${type}`),
          fetch(`api/pokemon/pokemon-type/${zType}`),
        ]);

        const habitatPokemon = await responses[0].json();
        const shapePokemon = await responses[1].json();
        const typePokemon = await responses[2].json();
        const zTypePokemon = await responses[3].json();

        const allPokemonNames = [
          habitatPokemon,
          shapePokemon,
          typePokemon,
          zTypePokemon,
        ];

        console.log({ allPokemonNames });
        const detailsPromises = allPokemonNames.map((name) =>
          fetch(`api/pokemon/pokemon-details/${name}`).then((res) => res.json())
        );
        console.log({ detailsPromises });

        const pokemonDetails = await Promise.all(detailsPromises);
        console.log("pokemonDetails", pokemonDetails); // This will show the detailed info of each Pokémon
        setMatches(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokémon matches:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemonMatches();
  }, [habitat, shape, type, zType, setMatches, matches]);

  return (
    <>
      <h1>{`${name}'s Pokebud Analysis`}</h1>
      <div className="dialogue">
        {loading ? (
          <>
            <div className="loading">
              Beep beep.. doot dooot dooot.. calculating
              <img
                className="snorlax-loading"
                src="https://media.tenor.com/3Qj2zvHVl40AAAAi/snorlax-sleeping.gif"
              ></img>
            </div>
          </>
        ) : (
          <ReactTyped
            startWhenVisible
            typeSpeed={20}
            backSpeed={0}
            loop={false}
            showCursor={false}
            strings={[
              `You matched with
                        <ul>
                            <li>Pokemon that have the habitat: ${capitilize(
                              habitat
                            )}</li>
                            <li>Pokemon that have the shape: ${capitilize(
                              shape
                            )}</li>
                            <li>${capitilize(
                              type
                            )} and ${zType} Pokemon types</li>
                        </ul>
                      Ready to see your matches?
                     `,
            ]}
            onComplete={() => setReady(true)}
          />
        )}
      </div>
      {ready && (
        <>
          <button className="submit" onClick={() => setGameState("selection")}>
            Ready!
          </button>
          <button className="secondary" onClick={() => setGameState("result")}>
            Back
          </button>
        </>
      )}
    </>
  );
}
