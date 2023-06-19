const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'Please provide a user id'],
        ref: 'User'
    },
    groupId: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'Please provide a group id'],
        ref: 'Group'
    },
    mediaType: {
        type: String,
        enum: ['photo', 'video'],
        required: [true, "Please provide a media type"],
        lowerCase: true,
    },
    filePath: {
        type: String,
        required: [true, "Please provide a file path"],
    }
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

const Media = mongoose.model('Media', mediaSchema);

module.exports = Media;