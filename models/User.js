const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:  [true, "Please provide a name"]
    },
    avatar: {
        type: String
    },
    email: {
        type: String,
        required: [true, "Please provide an email address"],
        lowercase: true
    },
    phoneNumber: {
        type: String,
        required: [true, "Please provide a phone number"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },
    passwordConfirm: {
        type: String
    }

},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;