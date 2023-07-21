
const errorHandler = require("./errorHandler");
const {
    NOTIFICATION_SEND,
    NOTIFICATION_READ
} = require('../../constants/socketEvents');
const catchAsync = require("../../utils/catchAsync");
const Notification = require("../../models/Notification");
const User = require("../../models/User");

exports.notificationSend = async (data, callback) => {

        const { type, resourceId, senderId, recipients } = data
        const sender = await User.findById(senderId);
        console.log(data)
        console.log("================================")
        console.log(sender)

        if(!sender) {
            return;
        }

        const firstName = sender.name.split(' ')[0];
        const text = `${firstName} sent you an invitation`;

        const notification = await Notification.create({
            type,
            resourceId,
            text,
            recipients,
            sender
        });

        notification.sender = sender;

        console.log(notification)

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