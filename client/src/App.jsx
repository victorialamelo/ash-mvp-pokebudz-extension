import { useState, useContext } from 'react'
import MainMenu from './Components/MainMenu'
import Questions from './Components/Quiz'
import Selection from './Components/Selection'
import { QuizContext } from './Helpers/Contexts';

import './App.css'

function App() {
  const [gameState, setGameState] = useState("menu");

  return (
    <>
      <div className="App">
        <h1>Pokemon Adoption Agency</h1>
        <QuizContext.Provider value={{ gameState, setGameState }}>
          {gameState === "menu" && <MainMenu />}
          {gameState === "questions" && <Questions />}
          {gameState === "selection" && <Selection />}
        </QuizContext.Provider>
      </div>
    </>
  )
}

export default App
