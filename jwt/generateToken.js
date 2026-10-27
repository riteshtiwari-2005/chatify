const jwt = require("jsonwebtoken");

const createTokenAndSaveCookie = (userId, res) => {
    const isLocal = process.env.NODE_ENV === "development";
    const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
        expiresIn: "10d"
    });
    res.cookie("jwt", token, {
        httpOnly: true, // protect from xss attack
        secure: !isLocal,
        sameSite: isLocal ? "lax" : "none",
        maxAge: 10 * 24 * 60 * 60 * 1000,
    })
    return token;
}

module.exports = createTokenAndSaveCookie
