import { useState } from 'react';
import { QuizContext } from './Helpers/Contexts';
import MainMenu from './Components/MainMenu';
import Quiz from './Components/Quiz';
import Result from './Components/Result';
import Matches from './Components/Matches';
import Selection from './Components/Selection';
import './App.css';

function App() {
    const [gameState, setGameState] = useState("menu");
    const [name, setName] = useState("");
    const [answers, setAnswers] = useState({});
    const [zodiac,setZodiac] = useState("");
    const [matchingCriteria, setMatchingCriteria] = useState({
      pokemonType: "",
      pokemonHabitat: "",
      pokemonShape: "",
      zodiacType: "",
    });
    const [matches, setMatches] = useState([]);
    const [showForm, setShowForm] = useState(false);

    return (
      <QuizContext.Provider value={{
        answers, setAnswers,
        name, setName,
        gameState, setGameState,
        matchingCriteria, setMatchingCriteria,
        matches, setMatches,
        zodiac, setZodiac,
        showForm, setShowForm
          }}>
        <div className="App">
          {gameState === "menu" && <MainMenu />}
          {gameState === "questions" && <Quiz />}
          {gameState === "result" && <Result />}
          {gameState === "matches" && <Matches />}
          {gameState === "selection" && <Selection />}
        </div>
      </QuizContext.Provider>
    );
}

export default App;
