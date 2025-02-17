import { useState, useContext } from 'react';
import { ReactTyped } from "react-typed";
import { QuestionBank } from '../Helpers/QuestionBank';
import { QuizContext } from '../Helpers/Contexts';
import '../App.css';

export default function Quiz() {
    const { score, setScore, setGameState, name } = useContext(QuizContext); // Get name here
    const [currQuestion, setCurrQuestion] = useState(0);
    const [optionChosen, setOptionChosen] = useState("");

    const nextQuestion = () => {
      console.log("answer: ", QuestionBank[currQuestion].answer);
      console.log("option: ", optionChosen);
      if (QuestionBank[currQuestion].answer === optionChosen) {
        setScore(score + 1);
      }
      setCurrQuestion(currQuestion + 1);
    };

    const finishQuiz = () => {
      if (QuestionBank[currQuestion].answer === optionChosen) {
        setScore(score + 1);
      }
      setGameState("selection");
    };

    const greetings = [
      `Huh. ${name}. Bold choice. But hey, I guess you didn’t pick it. Welcome, ${name}!`,
      `${name}, ${name}, ${name} has a nice ring to it. I hope you’re ready. This is serious business.`,
      `Ooooh, ${name}, I have a good feeling about this one!`
    ];
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];


    return (
      <>
        <div className="Questions">

          <div className="dialogue">
            <ReactTyped
                startWhenVisible
                typeSpeed={40}
                backSpeed={0}
                loop={false}
                showCursor={false}
                strings={[
                    `<p> ${randomGreeting} Now, to find your perfect Pokébud, I just need to ask a few crucial, highly scientific, not-at-all-made-up questions. You ready?</p>`
                ]}
            />
          </div>
          <h2>{QuestionBank[currQuestion].prompt}</h2>
          <div className="options">
            <button onClick={() => setOptionChosen("A")}>{QuestionBank[currQuestion].optionA}</button>
            <button onClick={() => setOptionChosen("B")}>{QuestionBank[currQuestion].optionB}</button>
            <button onClick={() => setOptionChosen("C")}>{QuestionBank[currQuestion].optionC}</button>
            <button onClick={() => setOptionChosen("D")}>{QuestionBank[currQuestion].optionD}</button>
          </div>
          <h3>You chose {optionChosen}</h3>
          <h3>Score: {score}</h3>
          {currQuestion === QuestionBank.length - 1 ? (
            <button onClick={finishQuiz}>Finish Quiz</button>
          ) : (
            <button onClick={nextQuestion}>Next Question</button>
          )}
        </div>
      </>
    );
}
