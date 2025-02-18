import { useState } from 'react';
import { QuizContext } from './Helpers/Contexts';
import MainMenu from './Components/MainMenu';
import Quiz from './Components/Quiz';
import Result from './Components/Result';
import Matches from './Components/Matches';
import './App.css';

function App() {
    const [gameState, setGameState] = useState("menu");
    const [name, setName] = useState("");
    const [answers, setAnswers] = useState();
    const [zodiac,setZodiac] = useState("");
    const [matches, setMatches] = useState();

    return (
      <QuizContext.Provider value={{
          gameState,
          setGameState,
          name,
          setName,
          answers,
          setAnswers,
          zodiac,
          setZodiac,
          matches,
          setMatches
          }}>
        <div className="App">
          {gameState === "menu" && <MainMenu />}
          {gameState === "questions" && <Quiz />}
          {gameState === "result" && <Result />}
          {gameState === "matches" && <Matches />}
        </div>
      </QuizContext.Provider>
    );
}

export default App;
