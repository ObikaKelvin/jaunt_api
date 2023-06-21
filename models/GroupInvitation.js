const mongoose = require('mongoose');

const groupInvitationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Please provide a user id"],
    },
    group: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Please provide a user id"],
    },
    expiresAt: {
        type: Date,
        required: [true, "Please provide a date and time"]
    },
    
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

const GroupInvitation = mongoose.model('GroupInvitation', groupInvitationSchema);

module.exports = GroupInvitation;