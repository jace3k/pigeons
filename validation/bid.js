const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateBidInput(data) {
  let errors = {};

  data.bid = !isEmpty(data.bid) ? data.bid : '';

  if (Validator.isEmpty(data.bid)) {
    errors.bid = 'Podaj cenę';
  }

  if (!Validator.isNumeric(data.bid)) {
    errors.bid = 'Podaj poprawną kwotę';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }

};