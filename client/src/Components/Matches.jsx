import { useState, useContext } from 'react';
import { ReactTyped } from "react-typed";
import { QuizContext } from '../Helpers/Contexts';
import { getZodiacData } from '../Helpers/Zodiac';
import '../App.css';


export default function Matches() {
    const [ loading, setLoading ] = useState();
    const [ typeUrl, setTypeURL ] = useState();
    const { name,
            answers,
            zodiac,
            matches
         } = useContext(QuizContext);

    console.log(answers);
    // need to have
    // - pokemon type personality question
    // - pokemon type zodiac question
    // - pokemon shape
    // - pokemon habitat

    // fetchPokemonData function is to help call
    // TYPE https://pokeapi.co/api/v2/type/
    // SHAPE https://pokeapi.co/api/v2/pokemon-shape
    // HABITAT https://pokeapi.co/api/v2/pokemon-habitat
    // because within them are the urls to which pokemons match like this:

    async function fetchPokemonData(baseUrl, searchName) {
        try {
            const response = await fetch(baseUrl);

            if (!response.ok) throw new Error("Failed to fetch data");
                const data = await response.json();
                const result = data.results.find(item => item.name === searchName);
                console.log("fetching Pokemon Data ...")
                console.log("baseURL: ", baseUrl);
                console.log("result: ", result);

            return result ? result.url : null;
        // We need to access the url based on the name, for example if the user
        // chooses forest we need to access that url from https://pokeapi.co/api/v2/pokemon-habitat
        //
        // "results": [
        //     {
        //         "name": "forest",
        //         "url": "https://pokeapi.co/api/v2/pokemon-habitat/2/"
        //     },
        //
        } catch (error) {
            console.error("Error fetching data:", error);
            return null;
        }
    }

    // getPokemonTypes function gets the pokemon type using zodiac AND personality question
    async function getPokemonTypes() {
        const baseUrl = `https://pokeapi.co/api/v2/type/`;
        const zodiacPokemonType = getZodiacData(zodiac).pokemonType;
        const quizPokemonType = answers.pokemonType;

        setLoading(true);
        const typeUrl = await fetchPokemonData(baseUrl, userPokemonType);

        if (typeUrl) {
            setTypeURL(typeUrl);
        } else {
            console.log("No matches found");
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
