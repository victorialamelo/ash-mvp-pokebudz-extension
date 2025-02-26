import { BrowserRouter as Router, Routes, Route } from "react-router";

import QuizPage from "./pages/QuizPage"; // import the new start page
import HomePage from "./pages/HomePage"; // import HomePage
import LoginPage from "./pages/LoginPage"; // import Login page
import AdoptedPokemonPage from "./pages/AdoptedPokemonPage"; // import Login page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/start" element={<QuizPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/userpokemon/:id" element={<AdoptedPokemonPage />} />
      </Routes>
    </Router>
  );
}

export default App;
