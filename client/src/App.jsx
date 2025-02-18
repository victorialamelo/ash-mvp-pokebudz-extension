import { useState } from 'react';
import { QuizContext } from './Helpers/Contexts';
import MainMenu from './Components/MainMenu';
import Quiz from './Components/Quiz';
import Result from './Components/Result';
import './App.css';

function App() {
    const [gameState, setGameState] = useState("menu");
    const [name, setName] = useState("");
    const [answers, setAnswers] = useState({
      birthday: "",
      personality: "",
      buddyType: "",
      habitat: ""
    })

    return (
      <QuizContext.Provider value={{ gameState, setGameState, name, setName, answers, setAnswers }}>
        <div className="App">
          {gameState === "menu" && <MainMenu />}
          {gameState === "questions" && <Quiz />}
          {gameState === "result" && <Result />}
        </div>
      </QuizContext.Provider>
    );
}

export default App;
