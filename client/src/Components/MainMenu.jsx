import { useContext, useState } from 'react';
import { ReactTyped } from "react-typed";
import { QuizContext } from '../Helpers/Contexts';
import '../App.css';

export default function MainMenu() {
    const { setGameState, name, setName, email, setEmail } = useContext(QuizContext); // Add setName
    const [ skip, setSkip ] = useState(false);
    const [ loading, setLoading ] = useState(false)

    async function postName(userName, userEmail) {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          email: userEmail
        })
      }
      try {
        setLoading(true);
        const response = await fetch('/api/users', options);
        if (response.ok) {
          const data = await response.json();
          console.log("POST THE NAME", data);
        } else {
          console.log(response);
          console.log(`Server Error ${response.status} ${response.statusText}`);
        }
      } catch (e) {
        console.log(`Network Error: ${e.message}`)
      }
      setLoading(false);
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      if (name.trim() && email.trim()) {
          setName(name);
          setEmail(email);
          await postName(name, email);
          console.log("handleSubmit", name, email);
          setGameState("questions");
      } else {
          alert("um, Ysabella is staring at you. You should probably enter a name.");
      }
    };

    const handleSkip = () => {
      setSkip(!skip);

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
                  onComplete={() => console.log("Typing complete")}
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
              <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">Apply to Adopt</button>
          </form>
      </div>
    );
}
