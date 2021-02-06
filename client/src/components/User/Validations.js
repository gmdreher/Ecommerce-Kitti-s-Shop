const validator = require('validator');
const isEmpty = require('lodash.isempty');

export default function validateInput(data) {
  let errors = {};
  if (validator.isEmpty(data.email)){
    errors.email = 'Este campo es requerido'
  }
  if (validator.isEmpty(data.password)){
    errors.password = 'Este campo es requerido'
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}
