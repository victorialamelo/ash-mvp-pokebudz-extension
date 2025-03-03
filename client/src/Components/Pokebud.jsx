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
  backendGetUserPokemon,
  backendDeleteUserPokemon,
} from "../backend";
import { hasSession, saveSession, getCurrentSession } from "../session";

import "../App.css";

export default function Pokebud() {
  const { width, height } = useWindowSize();
  const { name, pokebud } = useContext(QuizContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPokebud, setShowPokebud] = useState(false);
  const [savePokebud, setSavePokebud] = useState(false);
  const [isFirstSave, setIsFirstSave] = useState(false);

  const navigate = useNavigate();

  const capitalize = (name) => name.charAt(0).toUpperCase() + name.slice(1);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = await backendCreateUser({
      name,
      email,
      password,
    });
    await backendCreateUserPokemon(user.id, pokebud.pokeid);
    const { token } = await backendAuthLogin({ email, password });
    saveSession(token);
    setSavePokebud(true);
    setIsFirstSave(true); // mark as first-time save
  };

  async function replacePokemon(event) {
    event.preventDefault();

    // get the userId from the current session
    const { userId } = getCurrentSession();

    // fetch the current user's Pokémon
    const currentPokemon = await backendGetUserPokemon(userId);

    // delete the old Pokémon
    await backendDeleteUserPokemon(currentPokemon.id);

    // associate the new Pokémon with the user
    await backendCreateUserPokemon(userId, pokebud.pokeid);

    // update the UI state to reflect the changes
    setSavePokebud(true);
    navigate("/userpokemon");
  }

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
            !hasSession() || isFirstSave
              ? `WOOHOOO! Congratulations! ${capitalize(
                  pokebud.pokename
                )} is your new buddy! Enter your email below and create a password if you want to explore more about this Pokémon.`
              : `Looks like you already have a Pokébud! Would you like to replace it with ${capitalize(
                  pokebud.pokename
                )}?`,
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
              )} is now saved as your buddy with your email address and password!</p>`,
            ]}
            onComplete={() => setShowPokebud(true)}
          />
        )}
      </div>

      {showPokebud &&
        !savePokebud &&
        (hasSession() ? (
          <>
            <form className="transition-form" onSubmit={replacePokemon}>
              <button type="submit">Replace my existing buddy</button>
            </form>
          </>
        ) : (
          <>
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
          </>
        ))}

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
