import { useState, useContext} from 'react'
import { QuestionBank } from '../Helpers/QuestionBank'
import { QuizContext } from '../Helpers/Contexts';
import '../App.css' // or menu specific css?


export default function Quiz() {
    const [currQuestion, setCurrQuestion] = useState(0)
    const {gameState, setGameState } = useContext(QuizContext);

  return (
    <>
      <div className="Questions">
        <h1>{QuestionBank[currQuestion].prompt}</h1>
        <div className="options"></div>
        <button> {QuestionBank[currQuestion].optionA}</button>
        <button> {QuestionBank[currQuestion].optionB}</button>
        <button> {QuestionBank[currQuestion].optionC}</button>
        <button> {QuestionBank[currQuestion].optionD}</button>

        <button onClick={() => {QuestionBank[currQuestion].optionD}}>Next Question</button>
      </div>
    </>
  );
}
