import { useContext, useState } from "react";
import { ReactTyped } from "react-typed";
import { QuizContext } from "../Helpers/Contexts";
import { useWindowSize } from "react-use";
import { useNavigate } from "react-router";
import Confetti from "react-confetti";

import {
  backendCreateUser,
  backendCreateUserPokemon,
  backendAuthLogin,
} from "../backend";
import { hasSession, saveSession } from "../session";

import "../App.css";

export default function Pokebud() {
  const { width, height } = useWindowSize();
  const { name, pokebud } = useContext(QuizContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPokebud, setShowPokebud] = useState(false);
  const [savePokebud, setSavePokebud] = useState(false);
  const navigate = useNavigate();

  const capitalize = (name) => name.charAt(0).toUpperCase() + name.slice(1);

  async function existingUserFlow() {
    // or update the user's buddy by calling the backend
    alert("You already have a buddy saved!");
    navigate("/userpokemon");
  }

  async function newUserFlow() {
    const user = await backendCreateUser({
      name,
      email,
      password,
    });
    await backendCreateUserPokemon(user.id, pokebud.pokeid);
    const { token } = await backendAuthLogin({ email, password });
    saveSession(token);
    setSavePokebud(true);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (hasSession()) {
      await existingUserFlow();
    } else {
      await newUserFlow();
    }
  };

  return (
    <>
      <Confetti width={width} height={height} />

      <h1>{`${name}'s Pokébud`}</h1>

      <div className="dialogue">
        <ReactTyped
          startWhenVisible
          typeSpeed={20}
          backSpeed={0}
          loop={false}
          showCursor={false}
          strings={[
            `WOOHOOO! Congratulations! ${capitalize(
              pokebud.pokename
            )} is your new buddy! Enter your email below and create a password if you want to learn more about this Pokémon.`,
          ]}
          onComplete={() => setShowPokebud(true)}
        />
        {showPokebud && (
          <div className="myBuddy">
            <div key={pokebud.pokeid} className="pokemon-card">
              <img src={pokebud.pokesprite} alt={pokebud.pokename} />
            </div>
          </div>
        )}

        {savePokebud && (
          <ReactTyped
            startWhenVisible
            typeSpeed={20}
            backSpeed={0}
            loop={false}
            showCursor={false}
            strings={[
              `<p>${capitalize(
                pokebud.pokename
              )} is now saved as your buddy!</p>`,
            ]}
            onComplete={() => setShowPokebud(true)}
          />
        )}
      </div>

      {showPokebud && !savePokebud && (
        <form className="transition-form" onSubmit={handleSubmit}>
          <label>Email address</label>
          <input
            type="email"
            placeholder="email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Save my buddy</button>
        </form>
      )}

      {savePokebud && (
        <button
          className="explore-button"
          onClick={() => navigate("/userpokemon")}
        >
          Explore more about this Pokémon
        </button>
      )}
    </>
  );
}
