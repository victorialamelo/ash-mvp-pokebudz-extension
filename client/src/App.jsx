import { useState } from "react";
import { QuizContext } from "./Helpers/Contexts";
import MainMenu from "./Components/MainMenu";
import Quiz from "./Components/Quiz";
import Result from "./Components/Result";
import Matches from "./Components/Matches";
import Selection from "./Components/Selection";
import Pokebud from "./Components/Pokebud";
import "./App.css";

function App() {
  // Game state === changes the component
  const [gameState, setGameState] = useState("menu");

  // User Info states
  const [name, setName] = useState("");
  const [userID, setUserID] = useState();
  const [answers, setAnswers] = useState({});
  const [zodiac, setZodiac] = useState("");

  // Search criteria to filter pokeAPI
  const [matchingCriteria, setMatchingCriteria] = useState({
    pokemonType: "",
    pokemonHabitat: "",
    pokemonShape: "",
    zodiacType: "",
  });
  const [matches, setMatches] = useState([]);

  // Users selected Pokebud
  const [pokebud, setPokebud] = useState({});

  return (
    <QuizContext.Provider
      value={{
        answers,
        setAnswers,
        name,
        setName,
        gameState,
        setGameState,
        matchingCriteria,
        setMatchingCriteria,
        matches,
        setMatches,
        zodiac,
        setZodiac,
        pokebud,
        setPokebud,
        userID,
        setUserID,
      }}
    >
      <div className="App">
        {gameState === "menu" && <MainMenu />}
        {gameState === "questions" && <Quiz />}
        {gameState === "result" && <Result />}
        {gameState === "matches" && <Matches />}
        {gameState === "selection" && <Selection />}
        {gameState === "pokebud" && <Pokebud />}
      </div>
    </QuizContext.Provider>
  );
}

export default App;

/*

helper logged_in
  token = localStorage.getItem("token")
  POST "/verify" with token
  then
    if ok
      return true
    else
      localStorage.removeItem("token")
      return false

App:
  path "/"
    if logged_in
      goto "/profile"
    else
      show
        HomePage
  
  path "/quiz"
    if logged_in
      goto "/profile" // cant take quiz again
    else
      show
        QuizPage
  
  path "/login"
    if logged_in
      goto "/profile"
    else
      show
        LoginPage
  
  path "/profile"
    if not logged_in
      goto "/login"
    else
      show
        ProfilePage

HomePage:
  - StartButton
    then
      goto "/quiz"
  - LoginButton
    then
      goto "/login"

QuizPage:
  stuff in current <App />

LoginPage:
  - EmailInput
  - PasswordInput
  - LoginButton
    then
      POST "/login"
      then
        if ok
          save JWT to local storage
          goto "/profile"
        else
          show error message

ProfilePage:
  - LogoutButton
    then
      remove JWT from local storage
      goto "/"
  - ProfileInfo
    - Name
    - Email
    - Pokemon
      
*/
