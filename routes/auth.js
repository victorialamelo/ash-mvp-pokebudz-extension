var express = require("express");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

var db = require("../model/helper");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");

require("dotenv").config();

const saltRounds = 10;

const supersecret = process.env.SUPER_SECRET;

var router = express.Router();

router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    try {
        //create a hashed version of the password
        const hash = await bcrypt.hash(password, saltRounds);

        await db(
            `INSERT INTO users (email, password) VALUES ("${email}", "${hash}")`
        );

        res.send({ message: "Register successful" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });

    }
});

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


// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const results = await db(
//             `SELECT * FROM users WHERE email = "${email}"`
//         );
//         const user = results.data[0];
//         if (user) {
//             const user_id = user.id;

//             const correctPassword = await bcrypt.compare(password, user.password);

//             if (!correctPassword) throw new Error("Incorrect password");

//             var token = jwt.sign({ user_id }, supersecret);
//             res.send({ message: "Login successful, here is your token", token });
//         } else {
//             throw new Error("User does not exist");
//         }
//     } catch (err) {
//         res.status(400).send({ message: err.message });
//     }
// });

router.get("/profile", userShouldBeLoggedIn, (req, res) => {
    res.send({ message: `hello, user ${req.userId}. this is your private profile page.` });
});

module.exports = router;
