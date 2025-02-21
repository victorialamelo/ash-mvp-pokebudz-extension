import { useContext } from 'react';
import { ReactTyped } from "react-typed";
import { QuizContext } from '../Helpers/Contexts';
import '../App.css';

export default function Matches() {
    const { name, matchingCriteria, matches, answers, setGameState, setPokebud } = useContext(QuizContext);
    console.log("matchingCriteria", matchingCriteria);
    console.log("matches", matches);
    console.log("answers", answers);

    const pokebudPick = (id, name, sprite) => {
      setGameState("pokebud");
      setPokebud({pokeid: id, pokename: name, pokesprite: sprite});
    }

    return (
      <>
        <div className="Selection">
          <h1>{`${name}'s Pokebud `}</h1>
          <div className="dialogue">

            <ReactTyped
                startWhenVisible
                typeSpeed={40}
                backSpeed={0}
                loop={false}
                showCursor={false}
                strings={[
                    `Wow, I think I did a great job at matching you up no? So ${name} which one will you call your best bud for life?`

                ]}
                onComplete={() => console.log("done")}
            />
          </div>
          <div className="pokemon-matches">
              {matches.map((poke) => (
                <div key={poke.id} className="pokemon-card">

                  <img src={poke.sprite} alt={poke.name} />
                  <button type="button" className="buddy" onClick={() => pokebudPick(poke.id, poke.name, poke.sprite)}>{poke.name}</button>
                </div>
              ))}
            </div>
        </div>
      </>
    );
}
