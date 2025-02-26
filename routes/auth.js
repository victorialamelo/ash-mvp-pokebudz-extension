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
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const results = await db(
            `SELECT * FROM users WHERE email = "${email}"`
        );
        const user = results.data[0];
        if (user) {
            const user_id = user.id;

            const correctPassword = await bcrypt.compare(password, user.password);

            if (!correctPassword) throw new Error("Incorrect password");

            var token = jwt.sign({ user_id }, supersecret);
            res.send({ message: "Login successful, here is your token", token });
        } else {
            throw new Error("User does not exist");
        }
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.get("/profile", userShouldBeLoggedIn, (req, res) => {
    res.send({ message: `hello, user ${req.userId}. this is your private profile page.` });
});

module.exports = router;
