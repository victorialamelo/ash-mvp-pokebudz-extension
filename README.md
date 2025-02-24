# PokeBudz

Welcome to PokeBudz! This is an adoption-style app where users are matched with a Pokémon based on a set of personality and preference-based questions. After you’ve completed the quiz, you’ll be paired with your new Pokémon buddy. 

[MVP Presentation Deck](https://docs.google.com/presentation/d/1CTRcdFXeXOaOQQX7ikvh5dBuHB9L4F_hUZ_kXhuLlTc/edit?usp=sharing)

## Features

- **User Quiz:**
  - Users complete a series of questions related to their ideal Pokémon. The questions are designed to determine the best match based on habitat, shape, personality, and even zodiac sign.
  - The answers are then used to filter through Pokémon options and find the most suitable match.
- **PokeAPI Integration:**
  - The app pulls data from the [PokeAPI](https://pokeapi.co/), including each Pokémon’s ID, name, and a sprite GIF.
  - This data is used to match users with their Pokémon buddy and display their Pokémon’s information.
- **Database Integration:**
  - Once a pokemon is matched to a user, if they'd like to save their match they can enter their email address as their unique identifier. This can later be used for returning user functionality.

## Future Features

### Certificate of Adoption

- **Adoption Certificate Generation:** Instead of an interactive dashboard, create a feature that generates a certificate of adoption. This certificate could include detailed information about the Pokémon—its name, type, personality traits, and even a fun adoption message.
  
- **Digital Keepsake:** The certificate could be available as a downloadable PDF or a dynamically rendered web page, serving as a digital proof of adoption and a fun memento for users.
  
### Interactive Dashboard

- **Caring for Your Pokémon:** Build a dashboard where users can interact with their Pokémon through actions such as:
    -   Feeding: Adjust the Pokémon’s happiness by tracking the time since its last meal. 
    -   Waking Up: Change the Pokémon's status when it wakes up, which may affect its overall happiness.
    -   Playing: Offer interactive ways to play with the Pokémon, influencing its happiness score.

- **Happiness Score Management:** You can use a default value or use the PokeAPI's `base_happiness` as a starting point and update it dynamically based on user actions.

- **Returning Users:** Develop functionality that allows users who have already been matched to log back in, view their Pokémon’s status, and continue interacting with their buddy.



### Notes for Future Development

The app is currently focused on matching users to their Pokémon buddy. As the project evolves, the backend and frontend will need to support features such as user authentication (for returning users), persistent Pokémon data, and more interactive features (like feeding and playing).

For the interactive dashboard, consider using additional React state management (like Context API or Redux) to track the Pokémon's current state and happiness over time.

## How to Use

### 1. Install Dependencies

Run `npm install` in the project folder to install dependencies related to Express (the server).

`cd client` and run `npm install` install dependencies related to React (the client).

#### Additional Dependency: React Typed
PokeBudz uses **React Typed** to animate dialogue across various components. Make sure to install it in the client directory:

`npm install react-typed`

** Example Usage **
Below is an example of how React Typed is implemented to create engaging dialogue:

```
import ReactTyped from 'react-typed';

<ReactTyped
  startWhenVisible
  typeSpeed={0}
  backSpeed={0}
  loop={false}
  showCursor={false}
  strings={[
    `<p>Doot doot.. beep beep...</p>`
  ]}
  onComplete={() => setShowForm(true)}
/>
```

### 2. Setup Database

Create `.env` file in project directory and add

```
DB_NAME=pokebudz
DB_PASS=YOUR_PASSWORD
```

(Make sure to replace `YOUR_PASSWORD` with your actual MySQL password)

Alternatively, you can rename the provided `.env.example` file to `.env`.

Access the mySQL CLI:

- **MAC:** Type `mysql -u root -p` into your terminal, enter your password when prompted.
- **WINDOWS:** Search for mySQL in windows search and open mySQL 8.0 Command Line Client. Enter you password when prompted.

### 3. Create the Database

In the MySQL CLI, type `create database pokebudz;` to create a database in MySQL.

Run `npm run migrate` in your **TERMINAL**, in the **project** folder (not your MySQL CLI! Open a new terminal window for this). This will create a tables called 'users' and 'user_pokemon' in your database. These are the table descriptions (also found in model > init_db.sql

```
users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

user_pokemon (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    pokemon_id INT NOT NULL,
    pokemon_name VARCHAR(100),
    nickname VARCHAR(100),
    adopted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_fed TIMESTAMP NULL,
    last_played TIMESTAMP NULL,
    last_awake TIMESTAMP NULL,
    happiness_score INT DEFAULT 0,
    status VARCHAR(100),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```


### 4. Run the Development Servers

In the project folder, run npm start to start the backend Express server on port 4000.
In the client folder, run npm run dev to start the React frontend server in development mode on port 5173. The app will automatically proxy API requests to port 4000.
Testing:

### 5. Testing
Access the frontend app at http://localhost:5173.
Test the backend API at http://localhost:4000/api.
