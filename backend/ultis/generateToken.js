const jwt = require("jsonwebtoken");

const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_ACCESS_KEY, {
        expiresIn: "365d",
    });
};

module.exports = { generateAccessToken };
