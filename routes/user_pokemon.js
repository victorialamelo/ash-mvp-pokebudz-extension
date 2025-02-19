const express = require('express');
const router = express.Router();
const db = require("../model/helper");

// GET all Pokémon for a user (by user_id)
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await db(`SELECT * FROM user_pokemon WHERE user_id = ${userId};`);
    res.status(200).send(result.data);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching user Pokémon', error: err.message });
  }
});

module.exports = router;


// user_pokemon.js
router.post("/", async (req, res) => {
    const { user_id, pokemon_id, nickname } = req.body;
    if (!user_id || !pokemon_id) {
      return res.status(400).send({ message: "User ID and Pokémon ID are required" });
    }

    const sql = `
      INSERT INTO user_pokemon (user_id, pokemon_id, nickname, happiness_score)
      VALUES (?, ?, ?, 0);`;

    try {
      await db(sql, [user_id, pokemon_id, nickname]);
      const result = await db("SELECT * FROM user_pokemon;");
      res.status(201).send(result.data);
    } catch (err) {
      res.status(500).send({ message: 'Error adding Pokémon to user', error: err.message });
    }
  });


// user_pokemon.js
router.put("/update/:id", async (req, res) => {
    const { id } = req.params; // user_pokemon record ID
    const { last_fed, last_played, happiness_score } = req.body;

    const sql = `
      UPDATE user_pokemon
      SET last_fed = ?, last_played = ?, happiness_score = ?
      WHERE id = ?`;

    try {
      await db(sql, [last_fed, last_played, happiness_score, id]);
      res.status(200).send({ message: 'User Pokémon data updated successfully' });
    } catch (err) {
      res.status(500).send({ message: 'Error updating Pokémon data', error: err.message });
    }
  });


// user_pokemon.js
router.put("/update/:id", async (req, res) => {
    const { id } = req.params; // user_pokemon record ID
    const { last_fed, last_played, happiness_score } = req.body;

    const sql = `
      UPDATE user_pokemon
      SET last_fed = ?, last_played = ?, happiness_score = ?
      WHERE id = ?`;

    try {
      await db(sql, [last_fed, last_played, happiness_score, id]);
      res.status(200).send({ message: 'User Pokémon data updated successfully' });
    } catch (err) {
      res.status(500).send({ message: 'Error updating Pokémon data', error: err.message });
    }
  });


// user_pokemon.js
router.delete("/:id", async (req, res) => {
    const { id } = req.params; // user_pokemon record ID
    const sql = `DELETE FROM user_pokemon WHERE id = ?`;

    try {
      await db(sql, [id]);
      res.status(200).send({ message: 'User Pokémon removed successfully' });
    } catch (err) {
      res.status(500).send({ message: 'Error removing Pokémon', error: err.message });
    }
  });


  module.exports = router;
