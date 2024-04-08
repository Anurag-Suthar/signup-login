import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: true,
        validate: {
            validator: function (value:any) {
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
    }
})

const Users =mongoose.models.Users|| mongoose.model('Users',userSchema);

export default Users