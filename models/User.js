const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:  [true, "Please provide a name"]
    },
    picture: {
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
    googleId: {
        type: String,
    },
    password: {
        type: String,
        // required: [true, "Please provide a password"]
    },
    passwordConfirm: {
        type: String
    }

},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

userSchema.pre('save', async function(next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();
  
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    next();
});
  

userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };

const User = mongoose.model('User', userSchema);

module.exports = User;