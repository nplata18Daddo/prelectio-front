export const REGEXP = {
  ONLY_LETTERS: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g,
  PHONE_NUMBER:
    /^((\[1-9]{1,4}?)|(\([0-9]{2,3}\)?)|([0-9]{2,4})?)*?[0-9]{3,4}?[0-9]{3,4}$/,
  ONLY_NUMBERS: /^[0-9]+$/,
  LETTERS_COMMAS: /^[,A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g,
  ONE_UPPER_LETTER: /^(?=.*?[A-Z])/,
  ONE_LOWER_LETTER: /(?=.*?[a-z])/,
  ONE_NUMBER: /(?=.*?[0-9])/,
  ONE_SPECIAL_CHAR: /(?=.*?[#?!@$%^&*-])/,
  PERCENTAGE: /^[1-9][0-9]?$|^100$/,
  LETTERS_AND_NUMBERS: /^[a-z0-9]+$/i,
};
