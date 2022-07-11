const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3

    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email is already taken!!!!"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email!!")
            }
        }

    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10,
    },
    password: {
        type: String,
        required: true,
        minlength: 3

    },
    city: {
        type: String,
        required: true,
        minlength: 3

    },
})

// we will create a new mongoose.Collection
const User = new mongoose.model('User', userSchema)

module.exports = User;  