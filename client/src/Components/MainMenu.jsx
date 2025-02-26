import { useContext, useState } from "react";
import { ReactTyped } from "react-typed"; // React Typed library used to animate dialogue
import { QuizContext } from "../Helpers/Contexts";
import "../App.css";

export default function MainMenu() {
  const { setGameState, name, setName } = useContext(QuizContext);
  const [showForm, setShowForm] = useState(false);

  const capitalize = (name) => name.charAt(0).toUpperCase() + name.slice(1);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name.trim()) {
      setGameState("questions"); // Changes the gameState to questions to change the page.
    } else {
      alert(
        "um, Ysabella is staring at you. You should probably enter a name."
      );
    }
  };

  return (
    <>
      <h1>Welcome!</h1>
      <div className="dialogue">
        <ReactTyped
          startWhenVisible
          typeSpeed={30}
          backSpeed={0}
          loop={false}
          showCursor={false}
          strings={[
            `
                    <p>Oh, hey there—wow, you’re really here.</p>
                    <p>Welcome to the Adopt-a-Pokebud Agency, where we match you with your ideal best bud… assuming, of course, that you’re worthy.</p>
                    <p>No pressure.</p>
                    <p>Anyway, my name’s Ysabella. What’s your name?</p>
                `,
          ]}
          onComplete={() => setShowForm(true)} // Once the dialogue has completed this will run setShowForm
        />
      </div>
      {showForm && (
        <>
          <form className="transition-form" onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => setName(capitalize(e.target.value))}
            />
            <button type="submit" className="submit">
              Apply to Adopt
            </button>
          </form>
        </>
      )}
    </>
  );
}
