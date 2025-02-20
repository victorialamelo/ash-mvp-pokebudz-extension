--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE if exists user_pokemon;
DROP TABLE if exists users;
SET foreign_key_checks = 1;

--
-- Create Tables
--
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE user_pokemon (
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
