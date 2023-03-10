const rateLimit = require("express-rate-limit");

exports.loginLimiter = rateLimit({
    // only one object it takes
    windowMs: 60 * 1000, //1 minute time window
    max: 5, // max 5 attempts in 1 minute
    //message: 'Too many login attempts. Try again later'
    handler: (req, res, next) => {
        let err = new Error('Too many login attempts. Try again later');
        err.status = 429;
        return next(err);
    }
});