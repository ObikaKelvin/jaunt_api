const Group = require('../models/Group');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const {
    createDocument,
    getDocuments,
    updateDocument,
    getDocument,
    deleteDocument
} = require('./factory');

exports.createGroup = createDocument(Group);
exports.getAllGroups = getDocuments(Group);
exports.updateGroup = updateDocument(Group);
exports.getGroup = getDocument(Group);
exports.deleteGroup = deleteDocument(Group);