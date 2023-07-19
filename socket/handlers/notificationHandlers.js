
const errorHandler = require("./errorHandler");
const {
    NOTIFICATION_SEND,
    NOTIFICATION_READ
} = require('../../constants/socketEvents');
const catchAsync = require("../../utils/catchAsync");
const Notification = require("../../models/Notification");
const User = require("../../models/User");

exports.notificationSend = async (data, callback) => {

        const { type, resourceId, text, recipients, sender } = data
        // console.log(typeof(callback))

        const notification = await Notification.create({
            type,
            resourceId,
            text,
            recipients,
            sender
        });

        const user = await User.findById(sender);

        notification.sender = user

        recipients.forEach(recipient => {
            global.io.of('/api/v1').to(recipient).emit(NOTIFICATION_SEND, notification)
        })
    
}

exports.notificationRead = async (data, callback) => {

    const { userId } = data
    // console.log(typeof(callback))

    const notification = await Notification.findOne({
        user: userId,
        resourceId,
        text,
        recipients,
        sender
    });

    const user = await User.findById(sender);

    notification.sender = user

    recipients.forEach(recipient => {
        global.io.of('/api/v1').to(recipient).emit(NOTIFICATION_SEND, notification)
    })
}