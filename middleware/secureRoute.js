const jwt = require("jsonwebtoken");
const User = require("../models/user.model");


const secureRoute = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        const token = req.cookies.jwt || (
            authorization && authorization.startsWith("Bearer ")
                ? authorization.slice(7)
                : null
        );
        if (!token) {
            return res.status(400).json({ error: "No token, authorization denied" });
        }
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        if (!decoded) {
            return res.status(400).json({ error: "Invalid token" });
        }
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(400).json({ error: "No user found" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: "Invalid token" });
    }
}

module.exports = secureRoute;