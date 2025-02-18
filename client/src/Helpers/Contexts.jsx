import { createContext } from "react";

export const QuizContext = createContext({
  gameState: "menu",
  setGameState: () => {},
  name: "",
  setName: () => {},
  answers: {
    birthday: "",
    personality: "",
    habitat: "",
  },
  setAnswers: () => {},
  zodiac: "",
  setZodiac: () => {}
});
