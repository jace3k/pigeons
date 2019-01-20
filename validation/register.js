const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';


    if (!Validator.isLength(data.name, {min: 3, max: 30})) {
        errors.name = 'Nazwa użytkownika musi mieć od 3 do 30 znaków';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Podaj nazwę uzytkownika';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Podaj email';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Niepoprawny adres email';
    }

    if (!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'Hasło musi mieć minimum 6 znaków'
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Podaj hasło';
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Potwierdź hasło';
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Hasła muszą się zgadzać';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

};