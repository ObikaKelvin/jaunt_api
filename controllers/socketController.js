const Notification = require("../models/Notification");
const catchAsync = require("../utils/catchAsync");
const socketEvents = require("../constants/socketEvents");

exports.notificationSend = (socket) => catchAsync(
    async({ type, resourceId, text, recipients }) => {

        const data = {
            type,
            resourceId,
            text,
            recipients
        }

        console.log(data)

        const notification = await Notification.create(data);

        recipients.forEach(recipient => {
            socket.broadcast.to(recipient).emit(socketEvents.NOTIFICATION_RECEIVE, notification)
        })
    
    }
)

exports.notificationRead = catchAsync(
    async({ type, resourceId, text, recipients }) => {

        const data = {
            type,
            resourceId,
            text,
            recipients
        }

        const notification = await Notification.create(data);

        recipients.forEach(recipient => {
            const newRecipients = recipients.filter(r => r !== recipient)
            newRecipients.push(id)
            socket.broadcast.to(recipient).emit(socketEvents.NOTIFICATION_RECEIVE, notification)
        })
    
    }
)