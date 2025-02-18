import {useContext} from 'react';
import { ReactTyped } from "react-typed";
import { QuizContext } from '../Helpers/Contexts';
import '../App.css' // or menu specific css?


export default function Result() {
  const { name, answers,  setGameState } = useContext(QuizContext);

  const restartQuiz = () => {
      setGameState("menu");
  }

  
  return (
    <>
        <div className="Result">
          <h1>{`${name}'s Pokebud Results`}</h1>
          <div className="dialogue">
            <ReactTyped
                startWhenVisible
                typeSpeed={40}
                backSpeed={0}
                loop={false}
                showCursor={false}
                strings={[
                  `<h3>Results for ${name}!</h3>
                  <p><strong>Birthday:</strong> ${answers.birthday}</p>
                  <p><strong>Personality:</strong> ${answers.personality}</p>
                  <p><strong>Habitat:</strong> ${answers.habitat}</p>`
                ]}
            />

        </div>
        <button onClick={restartQuiz}>Restart Quiz</button>

      </div>
    </>
  );
}
