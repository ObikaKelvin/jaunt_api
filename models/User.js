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

userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };

const User = mongoose.model('User', userSchema);

module.exports = User;