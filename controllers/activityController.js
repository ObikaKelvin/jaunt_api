const Activity = require('../models/Activity');
const Participant = require('../models/Participant');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

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

        // get all user's groups
        const activities = await Participant.find({
            user: user.id,
        }).populate({path: 'activity'})


        res.status(200).json({
            success: true,
            activities
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
        const { group, name, description, coordinates, startDateTime } = req.body;

        // create or update user preference
        const activity =  await Activity.create({
            group, name, description, coordinates, startDateTime
        })

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
        const { group, name, description, coordinates, startDateTime } = req.body;

        // create or update user preference
        const activity =  await Activity.create({
            group, name, description, coordinates, startDateTime
        })

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