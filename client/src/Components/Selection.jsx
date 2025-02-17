import {useContext} from 'react'
import { QuizContext } from '../Helpers/Contexts';
import '../App.css' // or menu specific css?


export default function Selection() {
    const {gameState, setGameState } = useContext(QuizContext);

  return (
    <>
      <div className="Selection">
        <h1>Selection</h1>

        <button onClick={() => {setGameState("menu")}}>ok</button>

      </div>
    </>
  );
}
