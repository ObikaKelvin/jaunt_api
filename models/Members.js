const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    group: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'Please provide a group id'],
        ref: 'Group'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'Please provide a user id'],
        ref: 'User'
    },
    isOwner: {
        type: Boolean,
        required: [true, 'Please specify the owner of this group'],
        default: false
    }
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

memberSchema.virtual('groups', {   
    ref: 'Group', // the collection/model name
    foreignField: 'groupId',
    localField: '_id',
    justOne: true, // default is false
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;