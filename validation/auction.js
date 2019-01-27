const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateAuctionInput(data) {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.description = !isEmpty(data.description) ? data.description : '';
    data.price = !isEmpty(data.price) ? data.price : '';

    if (Validator.isEmpty(data.title)) {
        errors.title = 'Tytuł jest wymagany';
    }

    if (Validator.isEmpty(data.description)) {
        errors.description = 'Opisz gołębia';
    }

    if (!Validator.isNumeric(data.price)) {
        errors.price = 'Podaj poprawną cenę';
    }

    if (Validator.isEmpty(data.price)) {
        errors.price = 'Podaj cenę';
    }

    // if (Validator.toDate(data.endDate) < Date.now()) {
    //     errors.endDate = 'Nie możesz cofać się w czasie'
    // }


    return {
        errors,
        isValid: isEmpty(errors)
    }

};