const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';
    // data.telephone = !isEmpty(data.telephone) ? data.telephone : '';
    data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';


    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = 'Podaj swoje imię';
    }

    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = 'Podaj swoje nazwisko';
    }


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

    if(data.telephone && !Validator.isLength(data.telephone, {min: 9, max: 12})) {
        errors.telephone = 'Zła długość';
    }

    if(data.telephone && !Validator.isNumeric(data.telephone)) {
        errors.telephone = 'To nie są cyfry';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

};