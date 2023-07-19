const uuid = require('uuid');

const Notification = require('../models/Notification');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllNotifications = catchAsync(
    /**
     * Allows users to get all their notifications
     * 
     * @param {Express.Request} req 
     * @param {Express.Request} res 
     * @param {Express.NextFunction} next 
     * 
     */
    async (req, res, next) => {
        const { user } = req;

        // get all user's notifications
        const notifications = await Notification.find({
            recipients: user._id
        }).populate('sender')


        res.status(200).json({
            success: true,
            notifications
        })
    }
);

exports.createNotification = catchAsync(
    /**
     * Allows users to create a notification
     * 
     * @param {Express.Request} req 
     * @param {Express.Request} res 
     * @param {Express.NextFunction} next 
     * 
     */
    async (req, res, next) => {
        const { name } = req.body;
        const { user } = req;

        // generate the invitation code for the notification
        const inviteCode = uuid.v4();

        // create the new notification
        const notification = await Notification.create({
            name,
            user: user.id,
            inviteCode
        });

        // check if notification was created successfully
        if(!notification) {
            return next(new AppError("Could not create notification, please try again", 404));
        }

        // add user to the notification and set as owner of the notification
        const member = await Members.create({
            notificationId: notification.id,
            user: user.id,
            isOwner: true
        })

        if(!member) {
            return next(new AppError("Sorry, we could not add you to this notification at the moment, please try again", 404));
        }

        res.status(201).json({
            success: true,
            data: notification
        })
    }
);

exports.readNotifications = catchAsync(
    /**
     * Allows users to create a notification
     * 
     * @param {Express.Request} req 
     * @param {Express.Request} res 
     * @param {Express.NextFunction} next 
     * 
     */
    async (req, res, next) => {
        const { user } = req;

        // delete the notification
        const notification = await Notification.updateMany({
            user: user.id,
        }, {
            status: 'read'
        });

        // check if notification was deleted successfully
        if(!notification) {
            return next(new AppError("Could not find notification, please try again", 404));
        }

        res.status(200).json({
            success: true,
            data: notification
        })
    }
);