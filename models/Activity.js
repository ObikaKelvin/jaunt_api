const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Please provide a user id"],
        ref: 'User',
    },
    name: {
        type: String,
        required: [true, "Please provide a name"],
        lowerCase: true
    },
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
        enum: ['pending', 'completed'],
        required: [true, "Please provide a status"],
        lowerCase: true,
        default: 'pending',
    },
    description: {
        type: String,
        lowerCase: true
    },
    coordinates: {
        type: Array,
        required: [true, "Please provide the coordinates of the location"]
    },
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