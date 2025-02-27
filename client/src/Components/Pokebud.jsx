import { useContext, useState } from "react";
import { ReactTyped } from "react-typed";
import { QuizContext } from "../Helpers/Contexts";
import { useWindowSize } from "react-use";
import { useNavigate } from "react-router";
import Confetti from "react-confetti";
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

  async function createUser(email, password) {
    try {
      const response = await fetch(`/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (response.ok) {
        const user = await response.json();
        console.log("USER CREATED");
        return user.id;
      } else {
        console.log(response);
        console.log(
          `Server Error ${response.status} ${response.statusText} ${response}`
        );
      }
    } catch (e) {
      console.log(`Network Error: ${e.message}`);
    }
  }

  async function createUserPokemon(buddyId, newUserID) {
    try {
      const response = await fetch("/api/userpokemon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: newUserID,
          pokemon_id: buddyId,
        }),
      });
      if (response.ok) {
        await response.json();
      } else {
        console.log(response);
        console.log(`Server Error ${response.status} ${response.statusText}`);
      }
    } catch (e) {
      console.log(`Network Error: ${e.message}`);
    }
  }

  async function login(email, password) {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const body = await response.text();
    const data = JSON.parse(body);

    console.log("login successful:", data);

    // Save the token in the local storage
    localStorage.setItem("token", data.token);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = await createUser(email, password);
    await createUserPokemon(pokebud.pokeid, userId);
    await login(email, password);
    setSavePokebud(true);
    console.log("name", name);
    console.log("pokebud", pokebud.pokeid);
    console.log("userID", userId);
  };

  return (
    <>
      <Confetti width={width} height={height} />

      <h1>{`${name}'s Pokebud`}</h1>

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
            )} is your new buddy!`,
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
