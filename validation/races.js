const Validator = require('validator');
const validNum = require('./valid-num');

module.exports = function validateRaceInput(data) {
    let errors = {};

    data.averageSpeed = validNum(parseInt(data.averageSpeed)) ? data.averageSpeed : '';

    if (!Validator.isInt(data.averageSpeed, {min: 0, max: 250} )) {
        errors.averageSpeed = 'Average speed must be greater than 0';
    }
    
    if (!Validator.isInt(data.accuracy, {min: 0, max: 100} )) {
        errors.accuracy = 'Accuracy must be between 0 and 100';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};