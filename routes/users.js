const express = require('express');
const router = express.Router();
const db = require("../model/helper");

// http://localhost:5101/api/users/

// G E T all users =======================
router.get("/", async function (req, res) {
    try {
        const results = await db("SELECT * FROM users");
        console.log("DATABASE RESULTS:", results); // Debugging
        res.json(results); // Fix .data issue
    } catch (err) {
        console.error("DB ERROR:", err);
        res.status(500).json({ error: "Database query failed", details: err });
    }
});

// G E T by  user id ==================================
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        // Query to fetch all Pokémon data the user has adopted
        const result = await db(`
        SELECT user_pokemon.*, pokemon.name AS pokemon_name, pokemon.sprite AS pokemon_sprite 
        FROM user_pokemon 
        JOIN pokemon ON user_pokemon.pokemon_id = pokemon.id 
        WHERE user_pokemon.user_id = ${userId}
      `);

        if (result.data.length) {
            res.status(200).send(result.data);
        } else {
            return res.status(404).send({ message: "No adopted Pokémon found for this user" });
        }
    } catch (err) {
        res.status(500).send({ message: 'Error fetching adopted Pokémon', error: err.message });
    }
});
// P O S T insert user ==========================
router.post("/", async function (req, res, next) {
    console.log("req.body", req.body);
    const { name } = req.body;

    if (!name) {
        return res.status(400).send({ message: "Name is required" });
    }

    const sql = `INSERT INTO users (name) VALUES ('${name}');`;

    try {
        await db(sql, [name || null]);
        //Return the updated records
        const result = await db(` SELECT * FROM users WHERE name = '${name}'
  ORDER BY id DESC LIMIT 1`);
        res.status(201).send(result.data);
    } catch (e) {
        console.error("INSERT ERROR FOR NAME", e);
        res.status(500).send({ message: e.message });
    }
});

// P O S T insert email ==========================
router.post("/email/:id", async function (req, res, next) {
    console.log("req.body", req.body);
    const { email } = req.body;
    const userID = +req.params.id;

    if (!email) {
        return res.status(400).send({ message: "Email and userID are required" });
    }

    const sql = `UPDATE users SET email = '${email}' WHERE id = ${userID}`;;

    try {
        await db(sql, [email || null]);
        //Return the updated records
        const result = await db(`SELECT * FROM users WHERE id = ${userID}`);
        res.status(201).send(result.data);
    } catch (e) {
        console.error("INSERT ERROR FOR EMAIL", e);
        if (e.code === "ER_DUP_ENTRY" || e.errno === 1062) {
            return res.status(409).send({ message: "This email is already in use." });
        }
        res.status(500).send({ message: e.message });
    }
});

// D E L E T E =======================================
router.delete("/:id", async function (req, res, next) {
    const userID = +req.params.id;

    try {
        await db(`DELETE FROM users WHERE id=${userID}`);
        const result = await db("SELECT * FROM users");
        res.status(201).send(result.data);
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
});


module.exports = router;
