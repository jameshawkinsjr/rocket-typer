const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateSignupInput(data) {
    let errors = {};
    data.username = validText(data.username) ? data.username : '';
    data.password = validText(data.password) ? data.password : '';


    if (Validator.isEmpty(data.username)) {
        errors.username = 'Username is required';
    }

    if (!Validator.isAlphanumeric(data.username)) {
        errors.username = 'Username can only be letters or numbers';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required.';
    }

    if (!Validator.isLength(data.password, {min: 8} )) {
        errors.password = 'Password must be at least 8 characters';
    }

    if (!Validator.isLength(data.password, {max: 50} )) {
        errors.password = 'Password must be fewer than 50 characters';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}