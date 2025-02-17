import {useContext} from 'react'
import { QuizContext } from '../Helpers/Contexts';
import '../App.css' // or menu specific css?


export default function MainMenu() {
    const {gameState, setGameState } = useContext(QuizContext);

  return (
    <>
      <div className="Menu">
        <h1>Menu</h1>

        <button onClick={() => {setGameState("questions")}}>Start</button>

      </div>
    </>
  );
}
