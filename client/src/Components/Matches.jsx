import { useContext, useEffect, useState } from 'react';
import { ReactTyped } from "react-typed";
import { QuizContext } from '../Helpers/Contexts';
import '../App.css';

// TO DO
// URGENT INCONSISTENT API CALLS maybe because you're the same API twice?
// Don't show buttons until typing is complete onComplete in React Typed

export default function Matches() {
  const { name, matchingCriteria, matches, setMatches, setGameState } = useContext(QuizContext);
  const habitat = matchingCriteria.pokemonHabitat;
  const shape = matchingCriteria.pokemonShape;
  const type = matchingCriteria.pokemonType;
  const zType = matchingCriteria.zodiacType;
  const [loading, setLoading] = useState(false);

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
          fetch(`api/pokemon/pokemon-type/${zType}`)
        ])

        const habitatPokemon = await responses[0].json();
        const shapePokemon = await responses[1].json();
        const typePokemon = await responses[2].json();
        const zTypePokemon = await responses[3].json();

        const allPokemonNames = [habitatPokemon, shapePokemon, typePokemon, zTypePokemon ];
        console.log({allPokemonNames});
        const detailsPromises = allPokemonNames.map(name =>
          fetch(`api/pokemon/pokemon-details/${name}`).then(res => res.json())
        );
        console.log({detailsPromises});

        const pokemonDetails = await Promise.all(detailsPromises);
        console.log("pokemonDetails", pokemonDetails); // This will show the detailed info of each Pokémon
        setMatches(pokemonDetails);
      }
      catch (error) {
        console.error("Error fetching Pokémon matches:", error);
      }
      finally {
        setLoading(false);
      }

    };
    fetchPokemonMatches();
  }, [habitat, shape, type, zType, setMatches, matches]);



    return (
      <>
      { loading ? (
        <div className="loading">
          <p>doot doot doot</p>
        </div>
        ) : (
        <div className="Matches">
          <h1>{`${name}'s Pokebud Matches`}</h1>
          <div className="dialogue">

            <ReactTyped
                startWhenVisible
                typeSpeed={20}
                backSpeed={0}
                loop={false}
                showCursor={false}
                strings={[
                    `You matched with
                        <ul>
                            <li>Pokemon that have the habitat: ${habitat}</li>
                            <li>Pokemon that have the shape: ${shape}</li>
                            <li>Pokemon types ${type} and ${zType}</li>
                        </ul>
                      Ready to see your matches?
                     `
                ]}
            />
          </div>
          <button className="submit" onClick={() => setGameState("selection")}>Ready!</button>
          <button className="secondary" onClick={() => setGameState("result")}>Back</button>
        </div>
        )}
      </>
    );
}
