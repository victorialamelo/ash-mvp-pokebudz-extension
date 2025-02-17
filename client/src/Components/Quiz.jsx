import { useState, useContext} from 'react'
import { QuestionBank } from '../Helpers/QuestionBank';
import { QuizContext } from '../Helpers/Contexts';
import '../App.css' // or menu specific css?


export default function Quiz() {
    const {score, setScore, setGameState } = useContext(QuizContext);
    const [currQuestion, setCurrQuestion] = useState(0);
    const [optionChosen, setOptionChosen] = useState("");

    const nextQuestion = () => {
      console.log("answer: ", QuestionBank[currQuestion].answer );
      console.log("option: ", optionChosen );
      if (QuestionBank[currQuestion].answer === optionChosen) {
        setScore(score + 1);
      }
      setCurrQuestion(currQuestion + 1);
    }

    const finishQuiz = () => {
      if (QuestionBank[currQuestion].answer === optionChosen) {
        setScore(score + 1);
      }
      setGameState("selection");
    }

  return (
    <>
      <div className="Questions">
        <h1>{QuestionBank[currQuestion].prompt}</h1>
        <div className="options"></div>
        <button onClick={(() => setOptionChosen("A"))}>{QuestionBank[currQuestion].optionA}</button>
        <button onClick={(() => setOptionChosen("B"))}>{QuestionBank[currQuestion].optionB}</button>
        <button onClick={(() => setOptionChosen("C"))}>{QuestionBank[currQuestion].optionC}</button>
        <button onClick={(() => setOptionChosen("D"))}>{QuestionBank[currQuestion].optionD}</button>
        <h3>You chose {optionChosen} </h3>
        <h3>Score: {score} </h3>
        {currQuestion == QuestionBank.length - 1 ?
        <button onClick={finishQuiz}>Finish Quiz</button>
        : <button onClick={nextQuestion}>Next Question</button> }
      </div>
    </>
  );
}
