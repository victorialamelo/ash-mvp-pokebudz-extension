import { useState, useContext } from 'react';
import { ReactTyped } from "react-typed";
import { QuizContext } from '../Helpers/Contexts';
import { getZodiacData } from '../Helpers/Zodiac';
import '../App.css';


export default function Matches() {
    const [ loading, setLoading ] = useState();
    const [ typeUrl, setTypeURL ] = useState();
    const { gameState, setGameState, name, answers, zodiac, matches, setMatches } = useContext(QuizContext);
    console.log("ability", answers.ability);
    console.log("habitat", answers.habitat);
    console.log("shape", answers.shape);
    console.log("pokemonType:", getZodiacData(zodiac).pokemonType);

    async function getPokemonTypes() {
        const url = `https://pokeapi.co/api/v2/type/`;
        const userPokemonType = getZodiacData(zodiac).pokemonType.toLowerCase();

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
              console.log("No matches found");
            } else {
              console.log(data.results.find(type => type.name === userPokemonType));
              const findType = data.results.find(type => type.name === userPokemonType);
              setTypeURL(findType.url);
            }
          } catch (error) {
            console.log(error)
          }

          setLoading(false);
        }

    async function getMatchByType() {
        const url = typeUrl;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                console.log("No matches found");
            } else {
                console.log(data.pokemon[0].pokemon.name);
                console.log(data.pokemon[1].pokemon.name);
                console.log(data.pokemon[2].pokemon.name);
            }
            } catch (error) {
            console.log(error)
            }

            setLoading(false);
        }



    return (
      <>
        <div className="Matches">
          <h1>{`${name}'s Pokebud Matches`}</h1>
          { loading && "Loading" }
          <div className="dialogue">
            <ReactTyped
                startWhenVisible
                typeSpeed={40}
                backSpeed={0}
                loop={false}
                showCursor={false}
                strings={[
                    `Loading your matches... doot doot... beep beep... ${matches}`
                ]}
            />

          </div>
          <button onClick={getPokemonTypes}>Load Pokémon List</button>
          <button onClick={getMatchByType}>getMatch</button>
        </div>
      </>
    );
}
