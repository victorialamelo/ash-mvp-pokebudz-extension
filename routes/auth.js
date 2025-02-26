var express = require("express");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

var db = require("../model/helper");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");

require("dotenv").config();

const saltRounds = 10;

const supersecret = process.env.SUPER_SECRET;

var router = express.Router();

// POST /login - Login user and generate token
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Query database to find the user by email
        const results = await db(`SELECT * FROM users WHERE email = "${email}"`);
        const user = results.data[0]; // Assuming results.data contains the query result

        if (!user) {
            throw new Error("User does not exist");
        }

        // Compare the provided password with the stored hashed password
        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
            throw new Error("Incorrect password");
        }

        // Generate a JWT token with user_id as payload
        const token = jwt.sign({ user_id: user.id }, supersecret);

        // Respond with the generated token and userId
        res.json({
            message: "Login successful",
            token,
            userId: user.id,  // Include userId in the response
        });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

module.exports = router;
