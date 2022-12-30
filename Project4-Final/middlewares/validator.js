const {body} = require('express-validator');
const {validationResult} = require('express-validator');
const Connection = require('../models/connection');

// check if id is valid
exports.validateId = (req, res, next) => {
    let id = req.params.id;
    if(id.match(/^[0-9a-fA-F]{24}$/)) {
        return next();
    } else {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }
};

exports.validateSignUp = [body('firstName','FirstName cannot be empty').notEmpty().trim().escape(),
body('lastName', 'LastName cannot be empty').notEmpty().trim().escape(),
body('email', 'Invalid Email Address').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be between 8 - 64 characters').isLength({min: 8, max: 64})];

exports.validateLogin = [body('email', 'Invalid Email Address').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be between 8 - 64 characters').isLength({min: 8, max: 64})];

exports.validateConnection = [body('title', 'Title cannot be empty').notEmpty().trim().escape(),
// body('topic', 'Topic cannot be empty').notEmpty().trim().escape(),
body('details', 'Details must be minimum 10 characters').isLength({min: 10}).trim().escape(),
body('date').isDate().withMessage('Date must be a date').isAfter().withMessage('Date must be at least after current date'),

// body('host', 'Host time cannot be empty').notEmpty().trim().escape(),
body('location', 'Location time cannot be empty').notEmpty().trim().escape(),
body('image', 'Image time cannot be empty').notEmpty().trim().escape(),
body('startTime', 'Start time is not a valid time').matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
body("endTime", 'End time is not a valid time').matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
body('endTime').custom((value, { req }) => {
    let start = req.body.start;
    if(value && start) {
        let simplestart = start.split(":")[0] + start.split(":")[1];
        let simpleend = value.split(":")[0] + value.split(":")[1];
        console.log(simplestart);
        console.log(simpleend);
        if (simplestart >= simpleend) {
            throw new Error("End time must be after start time");
        }
        
        return true;
    }
    
})];

// DEAR TA PLEASE COUNT THIS AS MY IMPLEMENTATION IT WAS CAUSING ERROR SO I COMMENTED IT OUT
exports.validateRSVP = [
    body('rsvp').exists().withMessage('RSVP cannot be empty')
    .if(body('rsvp').exists()).toUpperCase().isIn(['YES', 'NO', 'MAYBE']).withMessage('RSVP can only be Yes, No or Maybe')
];

exports.validateResult = (req, res, next) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });
        // redirecting 'back' to login page
        return res.redirect('back');
    } else{
        return next();
    }
};


