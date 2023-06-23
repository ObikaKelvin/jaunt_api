const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'Please provide a user id'],
        ref: 'User'
    },
    group: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'Please provide a activity id'],
        ref: 'Activity'
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