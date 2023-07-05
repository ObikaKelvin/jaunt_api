const uuid = require('uuid');
const validator = require('express-validator');

const Activity = require('../models/Activity');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/User');

exports.getAllActivities = catchAsync(
    /**
     * Allows users to get all their activities
     * 
     * @param {Express.Request} req 
     * @param {Express.Request} res 
     * @param {Express.NextFunction} next 
     * 
     */
    async (req, res, next) => {
        const { user } = req;

        const activities = await Activity.find({
            participants: user._id
        })

        res.status(200).json({
            success: true,
            activities,
            result: activities.length
        })
    }
);

exports.createActivity = catchAsync(
    /**
     * Allows users to create an activity
     * 
     * @param {Express.Request} req 
     * @param {Express.Request} res 
     * @param {Express.NextFunction} next 
     * 
     */
    async (req, res, next) => { 
        const { user } = req;
        const { name, description, long, lat, city, address, province, startDateTime, contacts } = req.body;

        const users = await User.find({
            'phoneNumber': { $in: contacts}
        }, {_id: 1 });

        const participants = users.map(user => {
            return user._id
        });

        participants.push(user.id);

        // generate the invitation code for the activity
        const inviteCode = uuid.v4();

        // create activity
        const activity =  await Activity.create({
            user, name, description, long, lat, city, address, province, startDateTime, participants, inviteCode
        });

         // check if group was created successfully
        if(!activity) {
            return next(new AppError("Could not create this activity, please try again", 404));
        }

        res.status(201).json({
            success: true,
            activity
        })
    }
);

exports.deleteActivity = catchAsync(
    /**
     * Allows users to create an activity
     * 
     * @param {Express.Request} req 
     * @param {Express.Request} res 
     * @param {Express.NextFunction} next 
     * 
     */
    async (req, res, next) => {
        const { user } = req;

        // delete the activity
        const activity = await Activity.findByIdAndDelete({
            user: user.id,
        });

        // check if activity was deleted successfully
        if(!activity) {
            return next(new AppError("Could not find activity, please try again", 404));
        }

        res.status(200).json({
            success: true,
            activity
        })
    }
);

exports.joinActivity = catchAsync(
    /**
     * Allows users to activity a group
     * 
     * @param {Express.Request} req 
     * @param {Express.Request} res 
     * @param {Express.NextFunction} next 
     * 
     */
    async (req, res, next) => {
        const { activityId } = req.params;
        const { inviteCode } = req.body;
        const { user } = req;

        // find group using the invitation code
        const activity = await Activity.findOne({
            id: activityId, 
            inviteCode
        }).populate('participants');


        // check if activity exists
        if(!activity) {
            return next(new AppError("Activity not found", 404));
        }

        isParticipant = activity.participants.find(participant => participant.id === user.id);
        
        if(isParticipant) {
            return next(new AppError("You are already a part of this activity", 400));
        }

        activity.participants.push(user._id);
        await activity.save();

        res.status(200).json({
            success: true,
            activity
        })
    }
);

exports.leaveActivity = catchAsync(
    /**
     * Allows users to leave an activity
     * 
     * @param {Express.Request} req 
     * @param {Express.Request} res 
     * @param {Express.NextFunction} next 
     * 
     */
    async (req, res, next) => {
        const { activityId } = req.params;
        const { user } = req;

        console.log(activityId);

        const activity = await Activity.findById(activityId);

        // check if activity exists
        if(!activity) {
            return next(new AppError("Activity not found", 404));
        }

        const participants = activity.participants.filter(participant => user._id === participant._id);
        activity.participants = participants;
        await activity.save();

        res.status(200).json({
            success: true,
            activity
        })
    }
);