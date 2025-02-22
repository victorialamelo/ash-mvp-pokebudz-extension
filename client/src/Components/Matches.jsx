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

    useEffect(() => {
    // We can skip these calls if we already have matches from the API
    if (matches.length > 0) {
      console.log("MATCHES FETCHED FROM THE API");
      return;
    }

    const fetchPokemonMatches = async () => {
        try {
            setLoading(true);
            const res1 = await fetch(`api/pokemon/pokemon-habitat/${habitat}`);
            const res2 = await fetch(`api/pokemon/pokemon-shape/${shape}`);
            const res3 = await fetch(`api/pokemon/pokemon-type/${type}`);
            const res4 = await fetch(`api/pokemon/pokemon-type/${zType}`);

            const habitatPokemon = await res1.json();
            const shapePokemon = await res2.json();
            const typePokemon = await res3.json();
            const zTypePokemon = await res4.json();

            console.log("T E S T I N G =====================================", habitatPokemon);
            const allPokemonNames = [habitatPokemon, shapePokemon, typePokemon, zTypePokemon ];

            const detailsPromises = allPokemonNames.map(name =>
                fetch(`api/pokemon/pokemon-details/${name}`).then(res => res.json())
            );
            console.log("detailsPromises ===================================", detailsPromises)

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
                typeSpeed={40}
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
          <button onClick={() => setGameState("selection")}>ready!</button>
          <button onClick={() => setGameState("result")}>back</button>
        </div>
        )}
      </>
    );
}
