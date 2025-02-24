import { useContext, useState } from 'react';
import { ReactTyped } from "react-typed"; // React Typed library used to animate dialogue
import { QuizContext } from '../Helpers/Contexts';
import '../App.css';

export default function MainMenu() {
  const { setGameState, name, setName, setUserID  } = useContext(QuizContext);
  const [ showForm, setShowForm ] = useState(false)
  const [ loading, setLoading ] = useState(false)

  const capitilize = (name) => name.charAt(0).toUpperCase() + name.slice(1);

  async function postName(userName) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: userName
      })
    }
    try {
      setLoading(true);
      const response = await fetch('/api/users', options);
      if (response.ok) {
        const data = await response.json();
        const newUserId = data[0].id;
        setUserID(newUserId); // This returns the userID of the user once name is inserted into the database
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
    if (name.trim()) {
        await postName(name); // Saves the users name to the database
        setGameState("questions"); // Changes the gameState to questions to change the page.
    } else {
        alert("um, Ysabella is staring at you. You should probably enter a name.");
    }
  };

  return (
    <>

      <div className="Menu">
          <h1>Welcome!</h1>
          <div className="dialogue">
            {loading ? ""
            : (
              <ReactTyped
                startWhenVisible
                typeSpeed={30}
                backSpeed={0}
                loop={false}
                showCursor={false}
                strings={[`
                    <p>Oh, hey there—wow, you’re really here.</p>
                    <p>Welcome to the Adopt-a-Pokebud Agency, where we match you with your ideal best bud… assuming, of course, that you’re worthy.</p>
                    <p>No pressure.</p>
                    <p>Anyway, my name’s Ysabella. What’s your name?</p>
                `]}
                onComplete={() => setShowForm(true)} // Once the dialogue has completed this will run setShowForm
              />
            )}
          </div>
          { showForm && (
          <>
          <form className="transition-form" onSubmit={handleSubmit}>
            <label>Name</label>
            <input
                type="text"
                placeholder="Enter your name..."
                value={name}
                onChange={(e) => setName(capitilize(e.target.value))}
            />
            <button type="submit" className="submit">Apply to Adopt</button>
          </form>
          </>
        )}
      </div>

    </>
  );
}
