const Validator = require('validator');
const validText = require('./valid-text');
const validNum = require('./valid-num');

module.exports = function validateProjectionInput(data) {
    let errors = {};

    data.averageSpeed = validNum(data.averageSpeed) ? data.averageSpeed : '';

    if (!Validator.isInt(data.averageSpeed, {min: 0} )) {
        errors.averageSpeed = 'Average speed must be greater than 0';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};