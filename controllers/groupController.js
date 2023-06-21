const uuid = require('uuid');

const Group = require('../models/Group');
const Members = require('../models/Members');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/User');
const Member = require('../models/Members');

exports.getAllGroups = catchAsync(
    /**
     * Allows users to get all their groups
     * 
     * @param {Express.Request} req 
     * @param {Express.Request} res 
     * @param {Express.NextFunction} next 
     * 
     */
    async (req, res, next) => {
        const { user } = req;

        // get all user's groups
        const allGroups = await Member.find({
            user: user.id,
        }).populate({path: 'group', select: "name"})


        res.status(200).json({
            success: true,
            allGroups
        })
    }
);

exports.createGroup = catchAsync(
    /**
     * Allows users to create a group
     * 
     * @param {Express.Request} req 
     * @param {Express.Request} res 
     * @param {Express.NextFunction} next 
     * 
     */
    async (req, res, next) => {
        const { name } = req.body;
        const { user } = req;

        // generate the invitation code for the group
        const inviteCode = uuid.v4();

        // create the new group
        const group = await Group.create({
            name,
            user: user.id,
            inviteCode
        });

        // check if group was created successfully
        if(!group) {
            return next(new AppError("Could not create group, please try again", 404));
        }

        // add user to the group and set as owner of the group
        const member = await Members.create({
            groupId: group.id,
            user: user.id,
            isOwner: true
        })

        if(!member) {
            return next(new AppError("Sorry, we could not add you to this group at the moment, please try again", 404));
        }

        res.status(201).json({
            success: true,
            data: group
        })
    }
);

exports.deleteGroup = catchAsync(
    /**
     * Allows users to create a group
     * 
     * @param {Express.Request} req 
     * @param {Express.Request} res 
     * @param {Express.NextFunction} next 
     * 
     */
    async (req, res, next) => {
        const { user } = req;

        // delete the group
        const group = await Group.findByIdAndDelete({
            user: user.id,
        });

        // check if group was deleted successfully
        if(!group) {
            return next(new AppError("Could not find group, please try again", 404));
        }

        res.status(200).json({
            success: true,
            data: group
        })
    }
);

exports.joinGroup = catchAsync(
    /**
     * Allows users to join a group
     * 
     * @param {Express.Request} req 
     * @param {Express.Request} res 
     * @param {Express.NextFunction} next 
     * 
     */
    async (req, res, next) => {
        const { inviteCode } = req.params;
        const { user } = req;

        console.log(inviteCode)

        // find group using the invitation code
        const group = await Group.findOne({
            inviteCode
        });

        // check if group exists
        if(!group) {
            return next(new AppError("Group not found", 404));
        }

        const member =  await Members.findOneAndUpdate(
            {user: user.id}, 
            { groupId: group.id, user: user.id },
            { new: true, upsert: true  }
        )

        if(!member) {
            return next(new AppError("Sorry, we could not add you to this group at the moment, please try again", 404));
        }

        res.status(200).json({
            success: true,
            data: group
        })
    }
);