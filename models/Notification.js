const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, "Please provide a text"],
        lowerCase: true
    },
    resourceId: {
        type: String,
        required: [true, "Please provide a resource id"]
    },
    type: {
        type: String,
        enum: ['invite', 'memory'],
        required: [true, "Please provide a type"],
        lowerCase: true,
    },
    recipients: [
        {
            type: mongoose.Schema.ObjectId,
            required: [true, "Please provide a recipient id"],
            ref: 'User',
        }
    ],
    status:  {
        type: String,
        enum: ['read', 'unread'],
        required: [true, "Please provide a status"],
        lowerCase: true,
        default: 'unread'
    },
    sender: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Please provide a sender id"],
        ref: 'User',
    }
    
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;