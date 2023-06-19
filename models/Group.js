const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Please provide a user id"],
    },
    name: {
        type: String,
        required: [true, "Please provide a name"],
        lowercase: true
    },
    description: {
        type: String,
        lowercase: true
    },
    avatar: {
        type: String
    },
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;