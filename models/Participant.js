const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'Please provide a user id'],
        ref: 'User'
    },
    activityId: {
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