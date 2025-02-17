import {useContext} from 'react'
import { QuizContext } from '../Helpers/Contexts';
import { QuestionBank } from '../Helpers/QuestionBank';
import '../App.css' // or menu specific css?


export default function Selection() {
    const { score, setScore, setGameState } = useContext(QuizContext);

    const restartQuiz = () => {
        setScore(0);
        setGameState("menu");
    }

  return (
    <>
      <div className="Selection">
        <h1>Selection</h1>
        <h3>{score} / {QuestionBank.length} </h3>
        <button onClick={restartQuiz}>Restart Quiz</button>

      </div>
    </>
  );
}
