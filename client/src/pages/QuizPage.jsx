import { useState, useRef, useEffect } from "react";
import { QuizContext } from "../Helpers/Contexts";
import MainMenu from "../Components/MainMenu";
import Quiz from "../Components/Quiz";
import Result from "../Components/Result";
import Matches from "../Components/Matches";
import Selection from "../Components/Selection";
import Pokebud from "../Components/Pokebud";
import "../App.css";

function QuizPage() {
  // Game state === changes the component
  const [gameState, setGameState] = useState("menu");

  // User Info states
  const [name, setName] = useState("");
  const [userID, setUserID] = useState();
  const [answers, setAnswers] = useState({});
  const [zodiac, setZodiac] = useState("");

  // Search criteria to filter pokeAPI
  const [matchingCriteria, setMatchingCriteria] = useState({
    pokemonType: "",
    pokemonHabitat: "",
    pokemonShape: "",
    zodiacType: "",
  });
  const [matches, setMatches] = useState([]);

  // Users selected Pokebud
  const [pokebud, setPokebud] = useState({});

  const audioRef = useRef();

  useEffect(() => {
    audioRef.current.volume = 0.1;
    audioRef.current.play();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        answers,
        setAnswers,
        name,
        setName,
        gameState,
        setGameState,
        matchingCriteria,
        setMatchingCriteria,
        matches,
        setMatches,
        zodiac,
        setZodiac,
        pokebud,
        setPokebud,
        userID,
        setUserID,
      }}
    >
      <div className="Content">
        {gameState === "menu" && <MainMenu />}
        {gameState === "questions" && <Quiz />}
        {gameState === "result" && <Result />}
        {gameState === "matches" && <Matches />}
        {gameState === "selection" && <Selection />}
        {gameState === "pokebud" && <Pokebud />}
        <audio
          ref={audioRef}
          style={{ colorScheme: "dark", marginTop: CSS.rem(2) }}
          src="https://fi.zophar.net/soundfiles/gameboy-gbs/pokemon-red/03%20To%20Bill%27s%20Origin%20~%20From%20Cerulean.mp3"
          loop
          controls
        ></audio>
      </div>
    </QuizContext.Provider>
  );
}

export default QuizPage;
