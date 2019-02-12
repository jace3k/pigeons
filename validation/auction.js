const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateAuctionInput(data) {
  let errors = {};

  // data.title = !isEmpty(data.title) ? data.title : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  data.ring = !isEmpty(data.ring) ? data.ring : '';
  data.price = !isEmpty(data.price) ? data.price : '';
  data.endDate = !isEmpty(data.endDate) ? data.endDate : '';
  data.sex = !isEmpty(data.sex) ? data.sex : '';
  data.race = !isEmpty(data.race) ? data.race : '';

  // if (Validator.isEmpty(data.title)) {
  //   errors.title = 'Tytuł jest wymagany';
  // }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'Opisz gołębia';
  }

  if (Validator.isEmpty(data.ring)) {
    errors.ring = 'Podaj nr obrączki';
  }

  if (!Validator.isNumeric(data.price)) {
    errors.price = 'Podaj poprawną cenę';
  }

  if (Validator.isEmpty(data.price)) {
    errors.price = 'Podaj cenę';
  }

  if (isEmpty(data.endDate)) {
    errors.endDate = 'Podaj date';
  }
  
  if (Validator.isEmpty(data.sex)) {
    errors.sex = 'Wybierz płeć';
  }

  if (Validator.isEmpty(data.race)) {
    errors.race = 'Podaj rasę gołębia';
  }

  if (data.endDate < 0) {
    errors.endDate = 'Nie możesz cofać się w czasie';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  }

};