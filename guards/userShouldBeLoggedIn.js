var jwt = require("jsonwebtoken");
require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;

// MIDDLEWARE

function userShouldBeLoggedIn(req, res, next) {
    //grab the token inside the header of the request
    //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE3NDA0NzczNDUsImV4cCI6MTc0MDQ4MDk0NX0.8y4pe_3JNo0nSS_NGNbDi844XDCySdSdZ8gkp-BlfTI "
    const authorizationHeader = req.headers["authorization"];

    if (authorizationHeader === undefined) {
        return res.status(401).send({ message: "please provide a token" });
    }

    if (!authorizationHeader.startsWith("Bearer ")) {
        return res.status(401).send({ message: "invalid authorization scheme" });
    }

    const token = authorizationHeader.slice("Bearer ".length);

    jwt.verify(token, supersecret, function (err, decoded) {
        //if the token is not valid(you made it up, or it is expired), send an error
        if (err) res.status(401).send({ message: err.message });
        else {
            //everything is awesome
            req.userId = decoded.user_id;
            next();
        }
    });
}

module.exports = userShouldBeLoggedIn;
