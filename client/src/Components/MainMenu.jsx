import { useContext, useState } from 'react';
import { ReactTyped } from "react-typed";
import { QuizContext } from '../Helpers/Contexts';
import '../App.css';

export default function MainMenu() {
    const { setGameState, name, setName } = useContext(QuizContext); // Add setName
    const [ skip, setSkip ] = useState();

    const handleSubmit = (event) => {
      event.preventDefault();
      if (name.trim()) {
          setName(name); // Save the name in context
          setGameState("questions");
      } else {
          alert("um, Ysabella is staring at you. You should probably enter a name.");
      }
    };

    const handleSkip = () => {
      setSkip(!skip);
      console.log("what is skip?", skip);
    }

    return (
      <div className="Menu">
          <h1>Welcome!</h1>
          <div className="dialogue">
          {skip ?
          (
          <div>
            <p>Oh, hey there—wow, you’re really here. Welcome to the Adopt-a-Pokebud Agency, where we match you with your ideal best bud… assuming, of course, that you’re worthy.</p>
            <p>No pressure.</p>
            <p>Anyway, my name’s Ysabella. What’s your name?</p>
          </div>) :
          (
            <ReactTyped
                  startWhenVisible
                  typeSpeed={40}
                  backSpeed={0}
                  loop={false}
                  showCursor={false}
                  strings={["<p>Oh, hey there—wow, you’re really here. Welcome to the Adopt-a-Pokebud Agency, where we match you with your ideal best bud… assuming, of course, that you’re worthy.</p><p>No pressure.</p><p>Anyway, my name’s Ysabella. What’s your name?</p>"]}
              />)
          }

          </div>
          <button className="skip" onClick={handleSkip}>skip</button>
          <form onSubmit={handleSubmit}>
              <input
                  type="text"
                  placeholder="Enter your name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
              />
              <button type="submit">Apply to Adopt</button>
          </form>
      </div>
    );
}
