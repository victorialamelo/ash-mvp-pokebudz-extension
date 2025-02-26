import { BrowserRouter as Router, Routes, Route } from "react-router";
import StartQuiz from "./pages/StartQuiz"; // import the new start page
import HomePage from "./pages/HomePage"; // import HomePage
import Login from "./pages/Login"; // import Login page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/start" element={<StartQuiz />} />
        <Route path="/auth/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
