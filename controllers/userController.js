const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/User');

exports.getMe = catchAsync(
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

        res.status(201).json({
            success: true,
            user
        })
    }
);

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
        const { contacts } = req.body;

        if(!contacts || contacts.length === 0) {
            return next(new AppError("Please provide a list of contacts", 400));
        }

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