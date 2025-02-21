import { useState } from 'react';
import { QuizContext } from './Helpers/Contexts';
import MainMenu from './Components/MainMenu';
import Quiz from './Components/Quiz';
import Result from './Components/Result';
import Matches from './Components/Matches';
import Selection from './Components/Selection';
import Pokebud from './Components/Pokebud';
import './App.css';

// TO DO
// Refactor useStates, alot of these can go into the UserInfo object
// straight away then updated in the DB in a more consistent way

function App() {
    // Game State === changes the component
    const [gameState, setGameState] = useState("menu");
    const [name, setName] = useState("");
    const [userID, setUserID] = useState();
    const [answers, setAnswers] = useState({});
    const [zodiac,setZodiac] = useState("");
    const [matchingCriteria, setMatchingCriteria] = useState({
      pokemonType: "",
      pokemonHabitat: "",
      pokemonShape: "",
      zodiacType: "",
    });
    const [matches, setMatches] = useState([]);
    const [pokebud, setPokebud] = useState({});
    const [userInfo, setUserInfo] = useState({
      userID: 0,
      userName: "",
      userAnswers: {},
      userCriteria: {},
      userBday: "",
      userPokebud: {},
    });

    return (
      <QuizContext.Provider value={{
        answers, setAnswers,
        name, setName,
        gameState, setGameState,
        matchingCriteria, setMatchingCriteria,
        matches, setMatches,
        zodiac, setZodiac,
        pokebud, setPokebud,
        userInfo, setUserInfo,
        userID, setUserID
          }}>
        <div className="App">
          {gameState === "menu" && <MainMenu />}
          {gameState === "questions" && <Quiz />}
          {gameState === "result" && <Result />}
          {gameState === "matches" && <Matches />}
          {gameState === "selection" && <Selection />}
          {gameState === "pokebud" && <Pokebud />}
        </div>
      </QuizContext.Provider>
    );
}

export default App;
