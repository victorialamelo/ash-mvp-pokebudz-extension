import { useContext, useEffect, useState } from 'react';
import { ReactTyped } from "react-typed";
import { QuizContext } from '../Helpers/Contexts';
import '../App.css';


export default function Matches() {
    const { name, matchingCriteria, matches, setMatches, setGameState } = useContext(QuizContext);
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

            const allPokemonNames = [habitatPokemon, shapePokemon, typePokemon, zTypePokemon];

            const detailsPromises = allPokemonNames.map(name =>
                fetch(`api/pokemon/pokemon-details/${name}`).then(res => res.json())
            );

            const pokemonDetails = await Promise.all(detailsPromises);

            console.log("pokemonDetails", pokemonDetails); // This will show the detailed info of each Pokémon
            setMatches(pokemonDetails);
            console.log(matches)
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
        <div className="Selection">
          <h1>{`${name}'s Pokebud `}</h1>
          <div className="dialogue">
            <p>{ loading ? "please wait loading results" : null }</p>
            <ReactTyped
                startWhenVisible
                typeSpeed={30}
                backSpeed={0}
                loop={false}
                showCursor={false}
                strings={[
                    `I think I did a great job at matching you up huh? no problemo. So which one will you call your best bud for life?`

                ]}
                onComplete={() => console.log("done")}
            />
            <div className="pokemon-matches">
              {matches.slice(0,3).map((poke) => (
                <div key={poke.id} className="pokemon-card">

                  <img src={poke.sprite} alt={poke.name} />
                  <button type="button" className="buddy">{poke.name}</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
}
