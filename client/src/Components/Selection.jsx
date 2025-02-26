import { useContext, useState } from "react";
import { ReactTyped } from "react-typed";
import { QuizContext } from "../Helpers/Contexts";
import "../App.css";

export default function Matches() {
  const { name, matchingCriteria, matches, answers, setGameState, setPokebud } =
    useContext(QuizContext);
  const [displayBuddys, setDisplayBuddys] = useState(false);
  console.log("matchingCriteria", matchingCriteria);
  console.log("matches", matches);
  console.log("answers", answers);

  const capitilize = (name) => name.charAt(0).toUpperCase() + name.slice(1);

  const pokebudPick = (id, name, sprite) => {
    setGameState("pokebud");
    setPokebud({ pokeid: id, pokename: name, pokesprite: sprite });
  };

  return (
    <>
      <h1>{`${name}'s Pokebud Matches`}</h1>
      <div className="dialogue">
        <ReactTyped
          startWhenVisible
          typeSpeed={20}
          backSpeed={0}
          loop={false}
          showCursor={false}
          strings={[
            `${name} here are your matches! So which one will you call your best bud for life?`,
          ]}
          onComplete={() => setDisplayBuddys(true)}
        />
        {displayBuddys && (
          <div className="pokemon-matches">
            {matches.map((poke) => (
              <div key={poke.id} className="pokemon-card">
                <img
                  onClick={() => pokebudPick(poke.id, poke.name, poke.sprite)}
                  src={poke.sprite}
                  alt={poke.name}
                />
                <p className="buddy">{capitilize(poke.name)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      {displayBuddys && (
        <div className="selectButtons">
          {matches.map((poke) => (
            <div key={poke.id} className="selectbuttons">
              <button
                type="button"
                className={!pokebudPick ? "selected" : "option"}
                onClick={() => pokebudPick(poke.id, poke.name, poke.sprite)}
              >
                {capitilize(poke.name)}
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
