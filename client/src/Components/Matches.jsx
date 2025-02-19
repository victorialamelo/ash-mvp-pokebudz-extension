import { useContext, useEffect, useState } from 'react';
import { ReactTyped } from "react-typed";
import { QuizContext } from '../Helpers/Contexts';
import '../App.css';


export default function Matches() {
    const { name, matchingCriteria, matches, setMatches } = useContext(QuizContext);
    const habitat = matchingCriteria.pokemonHabitat;
    const shape = matchingCriteria.pokemonShape;
    const type = matchingCriteria.pokemonType;
    const zType = matchingCriteria.zodiacType;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
    if (matches.length > 0) {
      console.log("matches fetched");
      return;
    }

    const fetchPokemonMatches = async () => {

        setLoading(true);
        try {
            const res1 = await fetch(`api/pokemon-habitat/${habitat}`);
            const res2 = await fetch(`api/pokemon-shape/${shape}`);
            const res3 = await fetch(`api/pokemon-type/${type}`);
            const res4 = await fetch(`api/pokemon-type/${zType}`);

            const habitatPokemon = await res1.json();
            const shapePokemon = await res2.json();
            const typePokemon = await res3.json();
            const zTypePokemon = await res4.json();

            const allPokemonNames = [habitatPokemon, shapePokemon, typePokemon, zTypePokemon];
            console.log("allPokemonNames", allPokemonNames);

            const detailsPromises = allPokemonNames.map(name =>
                fetch(`/api/pokemon-details/${name}`).then(res => res.json())
            );

            console.log("detailsPromises", detailsPromises);
            const pokemonDetails = await Promise.all(detailsPromises);

            console.log("pokemonDetails", pokemonDetails); // This will show the detailed info of each Pokémon
            setMatches(pokemonDetails);
        } catch (error) {
            console.error("Error fetching Pokémon matches:", error);
        }
        setLoading(false);
    };
    fetchPokemonMatches();
}, [habitat, shape, type, zType, setMatches]);

    return (
      <>
        <div className="Matches">
          <h1>{`${name}'s Pokebud Matches`}</h1>
          <div className="dialogue">
            <p>{ loading ? "please wait loading results" : null }</p>
            <ReactTyped
                startWhenVisible
                typeSpeed={0}
                backSpeed={0}
                loop={false}
                showCursor={false}
                strings={[
                    `You matched with
                        <ul>
                            <li>pokemon that have the habitat: ${habitat}</li>
                            <li>pokemon that have the shape: ${shape}</li>
                            <li>pokemon types ${type} and ${zType}</li>
                        </ul>
                     `
                ]}
            />
           <div className="pokemon-matches">
            {matches.map((poke) => (
              <div key={poke.id} className="pokemon-card">
                <img src={poke.sprite} alt={poke.name} />
                <p> {poke.name} is my bud!</p>
              </div>
            ))}
          </div>
          </div>
        </div>
      </>
    );
}
