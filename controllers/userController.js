const uuid = require('uuid');
const validator = require('express-validator');

const Activity = require('../models/Activity');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/User');


exports.verifyContacts = catchAsync(
    /**
     * Allows users to create an activity
     * 
     * @param {Express.Request} req 
     * @param {Express.Request} res 
     * @param {Express.NextFunction} next 
     * 
     */
    async (req, res, next) => { 
        const users = await User.find({
            'phoneNumber': { $in: contacts}
        }, {_id: 1,  phoneNumber: 1 });

        res.status(200).json({
            success: true,
            users,
            result: users.length
        })
    }
);