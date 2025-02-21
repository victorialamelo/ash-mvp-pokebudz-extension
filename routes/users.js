const express = require('express');
const router = express.Router();
const db = require("../model/helper");

// http://localhost:5101/api/users/

// G E T all users =======================
router.get("/", async function(req, res) {
  try {
    const results = await db("SELECT * FROM users;");
    console.log("DATABASE RESULTS:", results); // Debugging
    res.json(results); // Fix .data issue
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: "Database query failed", details: err });
  }
});

// G E T user id ==================================
router.get("/:id", async function(req, res, next) {
  //your code here
  const userID = +req.params.id;

  try {
    const result = await db(`SELECT * FROM users WHERE id = ${userID};`);
    if (result.data.length) {
      res.status(200).send(result.data);
    } else {
      return res.status(404).send({ message: "user not found" });
    }
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

// P O S T insert user ==========================
router.post("/", async function(req, res, next) {
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
    console.error("INSERT ERROR", e);
    res.status(500).send({ message: e.message });
  }
});

// D E L E T E =======================================
router.delete("/:id", async function(req, res, next) {
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
