# PokeBudz

Welcome to PokeBudz! This is an adoption-style app where users are matched with a Pokémon based on a set of personality and preference-based questions. After you’ve completed the quiz, you’ll be paired with your new Pokémon buddy, and you can interact with them by feeding, waking them up, playing, and more!

## Features

- User Quiz: Complete a fun questionnaire to determine your ideal Pokemon based on factors habitat, shape, personality and zodiac sign.
- PokeApi Integration: This app pulls data from the PokeApi to match you with a Pokemon, fetching the Pokemon's ID, name and sprite gif.

## Future Features

### Interactive Dashboard (Advanced)

- Caring for Your Pokémon: Build a dashboard where users can interact with their Pokémon through actions such as:
    -   Feeding: Adjust the Pokémon’s happiness by tracking the time since its last meal.
    -   Waking Up: Change the Pokémon's status when it wakes up, which may affect its overall happiness.
    -   Playing: Offer interactive ways to play with the Pokémon, influencing its happiness score.

- Happiness Score Management: Use the PokeAPI's base_happiness as a starting point and update it dynamically based on user actions.

- Returning Users: Develop functionality that allows users who have already been matched to log back in, view their Pokémon’s status, and continue interacting with their buddy.

The database is setup to take in these values but you can alter the database as you wish

+-----------------+--------------+------+-----+-------------------+-------------------+
| Field           | Type         | Null | Key | Default           | Extra             |
+-----------------+--------------+------+-----+-------------------+-------------------+
| id              | int          | NO   | PRI | NULL              | auto_increment    |
| user_id         | int          | NO   | MUL | NULL              |                   |
| pokemon_id      | int          | NO   |     | NULL              |                   |
| nickname        | varchar(100) | YES  |     | NULL              |                   |
| adopted_at      | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| last_fed        | timestamp    | YES  |     | NULL              |                   |
| last_played     | timestamp    | YES  |     | NULL              |                   |
| happiness_score | int          | YES  |     | 0                 |                   |
| last_awake      | timestamp    | YES  |     | NULL              |                   |
| pokemon_name    | varchar(100) | YES  |     | NULL              |                   |
| status          | varchar(100) | YES  |     | NULL              |                   |
+-----------------+--------------+------+-----+-------------------+-------------------+

### Certificate of Adoption (Simpler Alternative)

- Adoption Certificate Generation: Instead of an interactive dashboard, create a feature that generates a certificate of adoption. This certificate could include detailed information about the Pokémon—its name, type, personality traits, and even a fun adoption message.
- Digital Keepsake: The certificate could be available as a downloadable PDF or a dynamically rendered web page, serving as a digital proof of adoption and a fun memento for users.

### Notes for Future Development

The app is currently focused on matching users to their Pokémon buddy. As the project evolves, the backend and frontend will need to support features such as user authentication (for returning users), persistent Pokémon data, and more interactive features (like feeding and playing).

For the interactive dashboard, consider using additional React state management (like Context API or Redux) to track the Pokémon's current state and happiness over time.

## How to Use

### 1. Install Dependencies

Run `npm install` in the project folder to install dependencies related to Express (the server).

`cd client` and run `npm install` install dependencies related to React (the client).

### 2. Setup Database

Create `.env` file in project directory and add

```
DB_NAME=pokebudz
DB_PASS=YOUR_PASSWORD
```

(Make sure to replace `YOUR_PASSWORD` with your actual MySQL password)

Alternatively, you can rename the provided `.env.example` file to `.env`.

Access the mySQL CLI:

- MAC: Type `mysql -u root -p` into your terminal, enter your password when prompted.
- WINDOWS: Search for mySQL in windows search and open mySQL 8.0 Command Line Client. Enter you password when prompted.

### 3. Create the Database

In the MySQL CLI, type `create database pokebudz;` to create a database in MySQL.

Run `npm run migrate` in your **TERMINAL**, in the **project** folder (not your MySQL CLI! Open a new terminal window for this). This will create a table called 'items' in your database.

### 4. Run the Development Servers

In the project folder, run npm start to start the backend Express server on port 4000.
In the client folder, run npm run dev to start the React frontend server in development mode on port 5173. The app will automatically proxy API requests to port 4000.
Testing:

### 5. Testing
Access the frontend app at http://localhost:5173.
Test the backend API at http://localhost:4000/api.
