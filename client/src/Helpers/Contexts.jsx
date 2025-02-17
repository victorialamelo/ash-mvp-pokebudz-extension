import { createContext } from "react";

export const QuizContext = createContext({
  gameState: "menu",
  setGameState: () => {},
  score: 0,
  setScore: () => {},
  name: "",                  
  setName: () => {},
});
