import { useNavigate, Link } from "react-router";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="Content">
      <h1>Welcome to the Pokebudz!</h1>
      <button onClick={() => navigate("/start")}>Start Quiz</button>
      <section className="buttons-position-center">
        <Link to="./auth/login">
          <button className="home">Login</button>
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
