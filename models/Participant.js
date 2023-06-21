const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'Please provide a user id'],
        ref: 'User'
    },
    activity: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'Please provide a activity id'],
        ref: 'Activity'
    },
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant;