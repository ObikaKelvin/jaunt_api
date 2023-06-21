const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        lowerCase: true
    },
    type: {
        type: String,
        enum: ['allgery', 'diet', 'medicalCondition', 'dishes'],
        required: [true, "Please provide a type"],
        lowerCase: true,
    }
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

const Preference = mongoose.model('Preference', preferenceSchema);

module.exports = Preference;