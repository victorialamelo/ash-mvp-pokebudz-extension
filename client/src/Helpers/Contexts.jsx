import { createContext } from "react";

export const QuizContext = createContext({
  // changes the page
  gameState: "menu",
  setGameState: () => {},

  // sets the name of the user
  name: "",
  setName: () => {},

  // quiz answers
  answers: {},
  setAnswers: () => {},

  // user zodiac sign based on birthday
  zodiac: "",
  setZodiac: () => {},

  // User matching criteria for pokemon API calls
  // Consolidated matching criteria
  matchingCriteria: {
    pokemonType: "",
    pokemonHabitat: "",
    pokemonShape: "",
    zodiacType: "",
  },
  setMatchingCriteria: () => {},

  // Pokemon matches
  matches: [],
  setMatches: () => {},
});
