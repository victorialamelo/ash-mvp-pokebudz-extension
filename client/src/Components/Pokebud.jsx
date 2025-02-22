import { useContext, useState } from 'react';
import { ReactTyped } from "react-typed";
import { QuizContext } from '../Helpers/Contexts';
import '../App.css';

// TODO
// POST user birthday and zodiac sign in the database
// POST userID and pokemonID and base_happiness

export default function Pokebud() {
    const [ loading, setLoading ] = useState(false);
    const { name, pokebud, userID } = useContext(QuizContext);
    const [ email, setEmail ] = useState("");

    async function postEmail(userEmail) {
        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userEmail
          })
        }
        try {
          setLoading(true);
          const response = await fetch(`/api/users/email/${userID}`, options);
          if (response.ok) {
            await response.json();
            console.log("EMAIL INSERTED")
          } else {
            console.log(response);
            console.log(`Server Error ${response.status} ${response.statusText} ${response}`);
          }
        } catch (e) {
          console.log(`Network Error: ${e.message}`)
        } finally {
          setLoading(false);
        }
      }

    async function postIDs( buddyId, newUserID ) {
      const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              user_id: newUserID,
              pokemon_id: buddyId
          })
      }
      try {
          setLoading(true);
          const response = await fetch('/api/userpokemon', options);
          if (response.ok) {
            await response.json();
          } else {
            console.log(response);
            console.log(`Server Error ${response.status} ${response.statusText}`);
          }
      } catch (e) {
          console.log(`Network Error: ${e.message}`)
      } finally {
          setLoading(false);
      }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (email.trim()) {
            await postEmail(email);
            await postIDs(pokebud.pokeid, userID)
            console.log("name", name);
            console.log("pokebud", pokebud.pokeid);
            console.log("userID", userID);
        } else {
            alert("uh oh");
        }
      };

    return (
      <>
      { loading ? "doot doot" : (
        <div className="Selection">
          <h1>{`${name}'s Pokebud `}</h1>
          <div className="dialogue">
            <ReactTyped
                startWhenVisible
                typeSpeed={40}
                backSpeed={0}
                loop={false}
                showCursor={false}
                strings={[
                    `WOOHOOO! Congratulations! ${pokebud.pokename} is your new buddy!`
                ]}
            />
            <div className="myBuddy">
                <div key={pokebud.pokeid} className="pokemon-card">
                    <img src={pokebud.pokesprite} alt={pokebud.pokename} />
                </div>
            </div>
          </div>
          <form className="transition-form" onSubmit={handleSubmit}>
                <label>Enter your email to save your buddy!</label>
                <input
                    type="email"
                    placeholder="email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">save</button>
            </form>
        </div>
        )}
      </>
    );
}
