const Validator = require('validator');
const validNum = require('./valid-num');

module.exports = function validateRaceInput(data) {
    let errors = {};

    data.averageSpeed = validNum(parseInt(data.averageSpeed)) ? data.averageSpeed : '';

    if (!Validator.isInt(data.averageSpeed, {min: 0} )) {
        errors.averageSpeed = 'Average speed must be greater than 0';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};