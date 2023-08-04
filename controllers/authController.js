const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const RefreshToken = require('../models/RefreshToken');

const signAccessToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};  

const createSendToken = async (user, statusCode, res) => {
  const accessToken = signAccessToken(user._id);
  const token = signAccessToken(user._id);
  const refreshToken = await RefreshToken.create({
    user: user._id,
    token: uuid.v4()
});
  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    accessToken,
    token,
    refreshToken: refreshToken.token,
    user
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email)

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  let user = await User.findOne({ email }).select('+password');
  console.log(user)

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
});

exports.signInWithGoogle = catchAsync(async (req, res, next) => {
    const { googleUser } = req.body;
    const { email, name, id, picture } = googleUser;
    console.log(req.body)
    const phoneNumber = '6045544331'
  
    const currentUser = await User.findOneAndUpdate(
        {googleId: id}, 
        { email, name, picture },
        { new: true, upsert: true  }
    )

    if(!currentUser.phoneNumber) {
        currentUser.phoneNumber = phoneNumber;
        await currentUser.save();
    }
  
    // 3) If everything ok, send token to client
    createSendToken(currentUser, 200, res);
});

exports.refreshToken = catchAsync(async (req, res, next) => {
    const { refreshToken } = req.body;
    if(!refreshToken){
        return next(new AppError(400, 'Please provide a refresh token'));
    }

    const currentRefreshToken = await RefreshToken.findOne({
        where: {
            token: refreshToken,
            revoked: false
        }
    });

    if(!currentRefreshToken){
        return next(new AppError(401, 'Unauthorized!!!, Please log in'));
    }

    const user = await User.findById(currentRefreshToken.user._id)

    if(!user){
        return next(new AppError(404, 'User not found'));
    }

    const accessToken = signAccessToken(user._id);

    res.status(200).send({
        status: "success",
        accessToken
    });
})
