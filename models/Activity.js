const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Please provide a user id"],
        ref: 'User',
    },
    activityName: {
        type: String,
        required: [true, "Please provide a name"],
        lowerCase: true
    },
    eventName: String,
    inviteCode: {
        type: String,
        required: [true, "Please provide a invite code"]
    },
    board: [
        {
            type: String
        }
    ],
    status: {
        type: String,
        enum: ['pending', 'completed', 'upcoming'],
        required: [true, "Please provide a status"],
        lowerCase: true,
        default: 'pending',
    },
    description: {
        type: String,
        lowerCase: true
    },
    preferences: {
        type: Array,
    },
    userWouldLikeTo: {
        type: String,
        enum: ['do something', 'eat something', 'both'],
        default: "eat something",
        lowerCase: true
    },
    lat: String,
    long: String,
    address: String,
    activityIcon: String,
    tips: String,
    budget: Number,
    startDateTime: {
        type: Date,
        required: [true, "Please provide a date and time"]
    },
    participants: [
        {
            type: mongoose.Schema.ObjectId,
            required: [true, "Please provide a user id"],
            ref: 'User',
        }
    ]
    
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;