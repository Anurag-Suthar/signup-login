const { JsonWebTokenError } = require('jsonwebtoken');
const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: true,
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid email address format',
        },
    },
    password: {
        type: String,
        required: [true, "Password is Required"],

    },
    firstName: {
        type: String,
        required: [true, "is Required"],
    },
    lastName: {
        type: String,
        required: [true, "is Required"],
    },
    created_at: { type: Date, required: true, default: Date.now },
    authToken: {
        type: String,
        default: ""
    }
})
userSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ user_id: this._id.toString() }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: '1h' })
        this.authToken = token;
        await this.save();

        return token;
    } catch (error) {
        console.log("error in generate Auth token");
    }

}
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});
const Users = new mongoose.model('Users', userSchema);

module.exports = {
    Users
}