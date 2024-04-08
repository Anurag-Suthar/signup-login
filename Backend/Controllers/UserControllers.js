const { Users } = require('../schema/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwt_Secret_key = process.env.JWT_SECRET_KEY;
//user registration 
const register = async (req, res, next) => {

    try {
        const { firstName, lastName, email, password } = req.body;

        const newUser = new Users({ firstName, lastName, email, password });
        if (!newUser) {
            return res.status(401).send({ error: "Authentication failed" })
        };

        await newUser.save();
        const authToken = await newUser.generateAuthToken();
        res.status(200).send({ message: 'User are registered successfully', token: authToken });

    } catch (error) {

        res.status(500).send({ message: `Registered Failed${error}`, error: error })
    }
}

//User login
const login = async (req, res, next) => {
    try {
        // const authToken = req.headers['auth_token']
        const { email, password } = req.body;
        const user = await Users.findOne({ email })
        if (!user) {
            return res.status(401).send({ error: "Authentication failed" })
        };
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send({ error: "Authentication failed" })
        }
        console.log("Login Data", user);
        const token = await tokenGenerator(user.id, jwt_Secret_key, "1h");
        user.authToken = token;
        await user.save();
        console.log("login token");
        res.status(200).send({ message: "User login successfully", token: token })
    } catch (error) {
        res.status(500).send({ error: "login failed" })
    }
}
const redirectPage = async (req, res, next) => {
    try {
        const auth_token = req.headers['auth_token']
        const user = await Users.findOne({ authToken: auth_token })
        if (!user) {

            res.status(200).send({ message: "You have not account please sign up for account", location: "signUp" })

        }
        res.status(200).send({ message: "Protect Route accessed ", redirect: "dashboard" })
        // res.redirect("../dashboard")
    } catch (error) {
        res.status(500).send({ error: "Failed authentication" })
    }
}
function tokenGenerator(user_id, secret_key, expireTime) {
    const token = jwt.sign({ user_id: user_id }, jwt_Secret_key, { expiresIn: expireTime })
    return token
}
function tokenVerify(token, secret_key) {
    const decoded = jwt.verify(token, secret_key);
    return decoded
}


module.exports = {
    register,
    login,
    redirectPage
}