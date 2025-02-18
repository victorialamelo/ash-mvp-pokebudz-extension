import { useContext, useEffect, useState } from 'react';
import { ReactTyped } from "react-typed";
import { QuizContext } from '../Helpers/Contexts';
import { Zodiac } from '../Helpers/Zodiac';
import '../App.css' // or menu specific css?


export default function Result() {
  const { name, answers,  setGameState, zodiac, setZodiac } = useContext(QuizContext);

  const restartQuiz = () => {
      setGameState("menu");
  }

  useEffect(() => {
    // Zodiac sign calculation logic based on birthday
    const bday = new Date(answers.birthday);
    const zodiacDay = bday.getDate();
    let zodiacMonth = bday.getMonth(); // Month is zero-indexed (0 = January, 11 = December)
    const zodiacSigns = [
      "Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer",
      "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn"
    ];

    // Zodiac calculation logic
    if ((zodiacMonth === 0 && zodiacDay <= 20) || (zodiacMonth === 11 && zodiacDay >= 22)) {
      zodiacMonth = 11; // Capricorn (December 22–January 19)
    } else if (zodiacMonth === 0 && zodiacDay > 20) {
      zodiacMonth = 1; // Aquarius (January 20–February 18)
    } else if (zodiacMonth === 1 && zodiacDay <= 18) {
      zodiacMonth = 1; // Pisces
    } else if (zodiacMonth === 1 && zodiacDay > 18) {
      zodiacMonth = 2; // Aries
    } else if (zodiacMonth === 2 && zodiacDay <= 20) {
      zodiacMonth = 2; // Aries
    } else if (zodiacMonth === 2 && zodiacDay > 20) {
      zodiacMonth = 3; // Taurus
    }
    // Continue this pattern for the rest of the zodiac signs...

    // Set the zodiac sign in context
    setZodiac(zodiacSigns[zodiacMonth]);

  }, [answers.birthday, setZodiac]);

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

                  <p>Wow, you're a ${zodiac}!</p>
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
