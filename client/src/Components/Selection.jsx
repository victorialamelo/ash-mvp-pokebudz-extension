import { useContext } from 'react';
import { ReactTyped } from "react-typed";
import { QuizContext } from '../Helpers/Contexts';
import '../App.css';

export default function Matches() {
    const { name, matchingCriteria, matches, answers, setGameState, setPokebud } = useContext(QuizContext);
    console.log("matchingCriteria", matchingCriteria);
    console.log("matches", matches);
    console.log("answers", answers);

    const capitilize = (name) => name.charAt(0).toUpperCase() + name.slice(1);

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
                typeSpeed={20}
                backSpeed={0}
                loop={false}
                showCursor={false}
                strings={[
                    `Wow, I think I did a great job at matching you up no? So ${name} which one will you call your best bud for life?`

                ]}
                onComplete={() => console.log("done")}
            />
            <div className="pokemon-matches">
              {matches.map((poke) => (
                <div key={poke.id} className="pokemon-card">

                  <img src={poke.sprite} alt={poke.name} />
                  <p className="buddy">{capitilize(poke.name)}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="selectButtons">
              {matches.map((poke) => (
                <div key={poke.id} className="selectbuttons">
                  <button type="button" className={!pokebudPick ? "selected" : "option"} onClick={() => pokebudPick(poke.id, poke.name, poke.sprite)}>{capitilize(poke.name)}</button>
                </div>
              ))}
          </div>
        </div>
      </>
    );
}
