const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

module.exports = 
    async (req, res, next) => {
        try {
            // 1) Getting token and check of it's there
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }
    
        if (!token) {
        return next(
            new AppError('You are not logged in! Please log in to get access.', 401)
        );
        }
    
        // 2) Verification token
        console.log(process.env.JWT_SECRET)
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        console.log(decoded)

    
        // 3) Check if user still exists
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
        return next(
            new AppError(
            'The user belonging to this token does no longer exist.',
            401
            )
        );
        }
    
        // GRANT ACCESS TO PROTECTED ROUTE
        req.user = currentUser;
        next();
        } catch (error) {
            console.log(error)
        }
    }
;