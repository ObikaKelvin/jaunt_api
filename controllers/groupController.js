const Group = require('../models/Group');
const Members = require('../models/Members');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const {
    createDocument,
    getDocuments,
    updateDocument,
    getDocument,
    deleteDocument
} = require('./factory');
const GroupInvitation = require('../models/GroupInvitation');

exports.createGroup = createDocument(Group);
exports.getAllGroups = getDocuments(Group);
exports.updateGroup = updateDocument(Group);
exports.getGroup = getDocument(Group);
exports.deleteGroup = deleteDocument(Group);

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
        const { inviteCode } = req.query;
        const { user } = req;

        // find group using the invitation code
        const group = await Group.findOne({
            inviteCode
        });

        // check if group exists
        if(!group) {
            return next(new AppError("Group not found", 404));
        }
        
        // get the group invitation to the user
        const groupInvite = await GroupInvitation.findOne({
            groupId: group.id,
            userId: user.id
        });

        if(!groupInvite) {
            return next(new AppError("Invalid invitation", 401));
        }

        if(groupInvite.expiresAt < Date.now()) {
            return next(new AppError("Sorry, this invitation has expired", 401));
        }

        // add user to the group
        const member = await Members.create({
            groupId: group.id,
            userId: user.id
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