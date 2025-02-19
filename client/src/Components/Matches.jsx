import { useContext } from 'react';
import { ReactTyped } from "react-typed";
import { QuizContext } from '../Helpers/Contexts';
import '../App.css';


export default function Matches() {
    const { name, matchingCriteria } = useContext(QuizContext);
    const habitat = matchingCriteria.pokemonHabitat;
    const shape = matchingCriteria.pokemonShape;
    const type = matchingCriteria.pokemonType;
    const zType = matchingCriteria.zodiacType;

    
    return (
      <>
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
                            <li>pokemon that have the habitat: ${habitat}</li>
                            <li>pokemon that have the shape: ${shape}</li>
                            <li>pokemon types ${type} and ${zType}</li>
                        </ul>
                     `
                ]}
            />

          </div>
          {/* <button onClick={getPokemonTypes}>Load Pokémon List</button>
          <button onClick={getMatchByType}>getMatch</button> */}
        </div>
      </>
    );
}
