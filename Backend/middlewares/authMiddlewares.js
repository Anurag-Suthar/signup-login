// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
    const token = req.headers['auth_token'];
    console.log(token);
    // if (!token) return res.status(401).send({ redirect: "signIn" });
    try {
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
        req.user_Id = decoded.user_Id;
        console.log(decoded.user_Id);
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token', redirect: "signIn" });
    }
};

module.exports = verifyToken;