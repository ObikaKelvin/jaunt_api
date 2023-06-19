const mongoose = require('mongoose');

const groupInvitationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Please provide a user id"],
    },
    groupId: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Please provide a user id"],
    },
    code: {
        type: String,
        required: [true, "Please provide a code"],
    },
    isUsed: {
        type: Boolean,
        default: false
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