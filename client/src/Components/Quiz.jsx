import { useState, useContext } from 'react';
import { ReactTyped } from "react-typed";
import { QuestionBank } from '../Helpers/QuestionBank';
import { QuizContext } from '../Helpers/Contexts';
import '../App.css';

// TO DO
// Build helper components maybe? Theres a lot happening in this one component
// Fix h1 spacing
// Fix calendar min and max obvs you can be born in the future.
// Nice to have - style calendar input (seems time consuming)

export default function Quiz() {
  const { setGameState, name, setAnswers, setMatchingCriteria } = useContext(QuizContext);
  const [ showForm, setShowForm ] = useState(false);
  const [ currQuestion, setCurrQuestion ] = useState(0);
  const [ optionChosen, setOptionChosen ] = useState("");
  const [ currentScript, setCurrentScript ] = useState("");
  const [ displayQuestion, setDisplayQuestion ] = useState(false);
  const [ quizIntro, setQuizintro ] = useState(false);
  const getRandomElement = (arr) => arr ? arr[Math.floor(Math.random() * arr.length)] : null;

  const handleAnswer = (selectedAnswer) => {
    setOptionChosen(selectedAnswer);
  }

  const handleDate = (bday) => {
    setOptionChosen(bday.target.value);
  };

  const handleCriteria = (selectedOption) => {
    setMatchingCriteria(criteria => ({
      ...criteria,
      ...(selectedOption.pokemonType && { pokemonType: getRandomElement(selectedOption.pokemonType) }),
      ...(selectedOption.pokemonHabitat && { pokemonHabitat: getRandomElement(selectedOption.pokemonHabitat) }),
      ...(selectedOption.pokemonShape && { pokemonShape: getRandomElement(selectedOption.pokemonShape) })
    }));
  };

  const nextQuestion = (event) => {
    event.preventDefault();
    const currentQ = QuestionBank[currQuestion];
    const selectedOption = currentQ.options?.find(option => option.answer === optionChosen);

    if (!optionChosen) return;

    setAnswers(ans => ({...ans, [currentQ.key] : optionChosen}));

    if (selectedOption) {handleCriteria(selectedOption)}

    if (currQuestion + 1 < QuestionBank.length) {
      setCurrQuestion(prev => prev + 1);
      setOptionChosen("");
      setCurrentScript("");
      setDisplayQuestion(true);
      setQuizintro(true);
    }
  };

  const finishQuiz = () => {
    const currentQ = QuestionBank[currQuestion];
    const selectedOption = currentQ.options?.find(option => option.answer === optionChosen);
    setAnswers(ans => ({...ans, [currentQ.key]: optionChosen}));
    if (selectedOption) { handleCriteria(selectedOption) }
    setGameState("result");
  };

  return (
    <>
      <div className="Questions">
        <h1><p>{`${name}'s`}</p> Pokebuds Application</h1>
        <div className="dialogue">
          <div className={quizIntro ? "hide" : "quiz intro"}>
              <ReactTyped
                    startWhenVisible
                    typeSpeed={0}
                    backSpeed={0}
                    loop={false}
                    showCursor={false}
                    strings={[
                     `<p>Huh. ${name}. Bold choice. But hey, I guess you didn’t pick it. Welcome, ${name}!</p>
                      <p>Now, to find your perfect Pokébud, I just need to ask a few crucial, highly scientific questions.</p>`
                    ]}
                    onComplete={() => setDisplayQuestion(true)}

              />
            </div>
            { displayQuestion &&
              <ReactTyped
                    startWhenVisible
                    typeSpeed={0}
                    backSpeed={0}
                    loop={false}
                    showCursor={false}
                    strings={[currentScript || QuestionBank[currQuestion].prompt(name)]}
                    onComplete={() => setShowForm(true)}
              />
            }
          </div>
          { showForm && (
          <>
        <form>
          {QuestionBank[currQuestion].key === "birthday" ? (
            <input type="date" min="1920-01-01" max="2015-12-31" value={optionChosen} onChange={(d) => handleDate(d)} />
          )
          : (
            <div className="options">
            {QuestionBank[currQuestion].options.map((option, index) => (
              <button
                type="button"
                key={index}
                onClick={() => handleAnswer(option.answer)}
                className={optionChosen === option.answer ? "selected" : "option"}
              >
                {option.answer}
              </button>
            ))}
            </div>
          )}

        {currQuestion === QuestionBank.length - 1 ? (
          <button type="button" onClick={finishQuiz} disabled={!optionChosen}>Finish Quiz</button>
        ) : (
          <button type="button" onClick={nextQuestion} disabled={!optionChosen}>Next Question</button>
        )}
        </form>
        </>
      )}
      </div>
    </>
  );
}
