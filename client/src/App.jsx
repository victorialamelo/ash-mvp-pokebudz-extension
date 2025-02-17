import { useState } from 'react';
import { QuizContext } from './Helpers/Contexts';
import MainMenu from './components/MainMenu';
import Quiz from './components/Quiz';
import Selection from './components/Selection';
import './App.css';

function App() {
    const [gameState, setGameState] = useState("menu");
    const [score, setScore] = useState(0);
    const [name, setName] = useState(""); 
    return (
      <QuizContext.Provider value={{ gameState, setGameState, score, setScore, name, setName }}>
        <div className="App">
          {gameState === "menu" && <MainMenu />}
          {gameState === "questions" && <Quiz />}
          {gameState === "selection" && <Selection />}
        </div>
      </QuizContext.Provider>
    );
}

export default App;
