const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Please provide a user id"],
        ref: 'User'
    },
    dietType: {
        type: String,
        enum: ['vegetarian', 'vegan', 'prescatarian', 'none'],
        required: [true, "Please provide a diet type"],
        lowerCase: true,
    },
    medicalConditions: {
        type: Array,
        required: [true, "Please provide at least one medical condition"],
    },
    allergies: {
        type: Array
    },
    foodDishes: {
        type: Array,
        required: [true, "Please provide at least one food dish"],
    },
    otherPeopleHabit: {
        type: String,
        enum: ['cool', 'notCool', 'maybe'],
        required: [true, "Please provide a choice"],
        lowerCase: true,
    }
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

const Preference = mongoose.model('Preference', preferenceSchema);

module.exports = Preference;