import { useState, useContext } from 'react';
import { ReactTyped } from "react-typed";
import { QuestionBank } from '../Helpers/QuestionBank';
import { QuizContext } from '../Helpers/Contexts';
import '../App.css';

export default function Quiz() {
    const { setGameState, name, setAnswers, answers, setMatchingCriteria } = useContext(QuizContext); // Get name here
    const [currQuestion, setCurrQuestion] = useState(0);
    const [optionChosen, setOptionChosen] = useState("");

    const getRandomElement = (arr) => arr ? arr[Math.floor(Math.random() * arr.length)] : null;

    const nextQuestion = () => {
      // get the key from the Question Bank
      const currentQ = QuestionBank[currQuestion];
      console.log("currentQ.options?", QuestionBank[currQuestion].options)
      const selectedOption = currentQ.options?.find(option => option.answer === optionChosen);
      console.log("selectionOption", selectedOption);
      setAnswers(ans => ({...ans, [currentQ]: optionChosen}));
      console.log("answers", answers)
      if (selectedOption) {
        setMatchingCriteria(criteria => ({
          ...criteria,
          ...(selectedOption.pokemonType && { pokemonType: getRandomElement(selectedOption.pokemonType) }),
          ...(selectedOption.pokemonHabitat && { pokemonHabitat: getRandomElement(selectedOption.pokemonHabitat) }),
          ...(selectedOption.pokemonShape && { pokemonShape: getRandomElement(selectedOption.pokemonShape) })
        }));
      }

      // after storing the answer go to the next question
      setCurrQuestion(currQuestion + 1);
      setOptionChosen("");
    };

    const finishQuiz = () => {
      const key = QuestionBank[currQuestion].key;
      const selectedOption = key.options?.find(option => option.answer === optionChosen);

      // this makes sure the final question is saved
      setAnswers(ans => ({...ans, [key]: optionChosen}));

      if (selectedOption) {
        setMatchingCriteria(criteria => ({
          ...criteria,
          ...(selectedOption.pokemonType && { pokemonType: getRandomElement(selectedOption.pokemonType) }),
          ...(selectedOption.pokemonHabitat && { pokemonHabitat: getRandomElement(selectedOption.pokemonHabitat) }),
          ...(selectedOption.pokemonShape && { pokemonShape: getRandomElement(selectedOption.pokemonShape) })
        }));
      }

      console.log("Final Answers:", answers)
      // change the game state to final results
      setGameState("result");
    };

    const handleChange = (event) => {
      event.preventDefault();
      setOptionChosen(event.target.value);
    };

    const greetings = [
      `Huh. ${name}. Bold choice. But hey, I guess you didn’t pick it. Welcome, ${name}!`,
      `${name}, ${name}, ${name} has a nice ring to it. I hope you’re ready. This is serious business.`,
      `Ooooh, ${name}, I have a good feeling about this one!`
    ];

    return (
      <>
        <div className="Questions">
          <h1>{`${name}'s Pokebuds Application`}</h1>
          <div className="dialogue">
            <ReactTyped
                startWhenVisible
                typeSpeed={40}
                backSpeed={0}
                loop={false}
                showCursor={false}
                strings={[
                    `<p> ${() => getRandomElement(greetings)}</p> <p>Now, to find your perfect Pokébud, I just need to ask a few crucial, highly scientific questions. <p>You ready?</p>`
                ]}
            />
          </div>

          <h2>
            {typeof QuestionBank[currQuestion].prompt === "function"
              ? QuestionBank[currQuestion].prompt(name)
              : QuestionBank[currQuestion].prompt}
          </h2>

          {QuestionBank[currQuestion].key === "birthday" ? (
            <input type="date" value={optionChosen} onChange={handleChange} />
          ) : (
            <div className="options">
            {QuestionBank[currQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => setOptionChosen(option.answer)}
                className={optionChosen === option.answer ? "selected" : ""}
              >
                {option.answer}
              </button>
            ))}
          </div>
          )}

          <h2>ok you picked: {optionChosen}</h2>

          {currQuestion === QuestionBank.length - 1 ? (
            <button onClick={finishQuiz}>Finish Quiz</button>
          ) : (
            <button onClick={nextQuestion} disabled={!optionChosen}>Next Question</button>
          )}
        </div>
      </>
    );
}
