import { useNavigate, Link } from "react-router";
import { Tooltip } from "react-tooltip";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="Content">
      <h1>Welcome to Pokebudz!</h1>
      <h3>
        Eager to meet your perfect Pokémon partner? Take the quiz now and find
        your new adventure buddy!
      </h3>
      <button onClick={() => navigate("/start")}>Start Quiz</button>
      <section className="buttons-position-center">
        <Link to="./auth/login">
          <button className="home" data-tooltip-id="login-tooltip">
            Login
          </button>
        </Link>
      </section>
      <div>
        <img
          src="https://i.gifer.com/5FBP.gif"
          alt="Ash and Pikachu GIF"
          style={{
            width: "280px",
            height: "auto",
            marginTop: "90px",
          }}
        />
      </div>
      <Tooltip
        id="login-tooltip"
        place="top"
        content="Log in to reunite with your Pokébud!"
      />
    </div>
  );
}

export default HomePage;
