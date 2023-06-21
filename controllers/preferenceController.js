const uuid = require('uuid');

const Preference = require('../models/Preference');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


exports.setPreference = catchAsync(
    /**
     * Allows users to set their preferences
     * 
     * @param {Express.Request} req 
     * @param {Express.Request} res 
     * @param {Express.NextFunction} next 
     * 
     */
    async (req, res, next) => {        
        const { user } = req;

        // create or update user preference
        const preference =  await Preference.findOneAndUpdate(
            {userId: user.id}, 
            {...req.body, userId: user.id },
            { new: true, upsert: true  }
        )

        // check if group was created successfully
        if(!preference) {
            return next(new AppError("Could not set preference, please try again", 404));
        }

        res.status(201).json({
            success: true,
            preference
        })
    }
);

exports.getPreferences = catchAsync(
    /**
     * Allows users to set their preferences
     * 
     * @param {Express.Request} req 
     * @param {Express.Request} res 
     * @param {Express.NextFunction} next 
     * 
     */
    async (req, res, next) => {        
        const { user } = req;
        const { id } = req.params;

        // find user preferences
        const preference =  await Preference.find({
            id,
            userId: user.id,
        })

        res.status(200).json({
            success: true,
            preference
        })
    }
);

exports.getOnePreference = catchAsync(
    /**
     * Allows users to set their preferences
     * 
     * @param {Express.Request} req 
     * @param {Express.Request} res 
     * @param {Express.NextFunction} next 
     * 
     */
    async (req, res, next) => {        
        const { user } = req;
        const { id } = req.params;

        // find user preference
        const preference =  await Preference.findOne({
            id,
            userId: user.id,
        })

        // check if preference exists
        if(!preference) {
            return next(new AppError("preference not found, please try again", 404));
        }

        res.status(200).json({
            success: true,
            preference
        })
    }
);