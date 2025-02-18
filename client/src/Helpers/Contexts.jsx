import { createContext } from "react";

export const QuizContext = createContext({
  gameState: "menu",
  setGameState: () => {},
  name: "",
  setName: () => {},
  answers: {
    ability: "",
    birthday: "",
    habitat: "",
    shape: ""
  },
  setAnswers: () => {},
  zodiac: "",
  setZodiac: () => {},
  matches: [],
  setMatches: () => {}
});
