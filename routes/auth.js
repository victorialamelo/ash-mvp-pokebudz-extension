var express = require("express");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var db = require("../model/helper");

require("dotenv").config();

const supersecret = process.env.SUPER_SECRET;

var router = express.Router();

// POST /login - login user and generate token
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // query database to find the user by email
        const results = await db(`SELECT * FROM users WHERE email = "${email}"`);
        const user = results.data[0]; // results.data contains the query result

        if (!user) {
            throw new Error("User does not exist");
        }

        // compare the provided password with the stored hashed password
        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
            throw new Error("Incorrect password");
        }

        // generate a JWT token with user_id as payload
        const payload = {
            user_id: user.id,
            //name: user.name,
            //email: user.email 
        };

        const token = jwt.sign(payload, supersecret);

        // respond with the generated token and userId
        res.json({
            message: "Login successful",
            token,
            userId: user.id,  // include userId in the response
        });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

module.exports = router;
